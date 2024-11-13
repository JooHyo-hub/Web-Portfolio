//-- 배너 이미지
$(document).ready(function(){

    let $bnImges_Box = $('.img_container');

    // 모든 이미지 초기값 숨김
    $bnImges_Box.css('opacity', 0);
    
    // 각 이미지 0.5초 간격으로 서서히 나타남
    $bnImges_Box.each(function(index) {

        $(this).delay(500 * index).animate({ opacity: 1 }, 500);

    });
});

//-- 패션위크 영역
$(document).ready(function(){

    let $fashionweek_box = $('.fashionweek_list_container');

    $fashionweek_box.addClass('moveBox');

    //스크롤 시 박스 이동
    $(window).scroll(function() {

        let $scrollTop = $(window).scrollTop();

        if($scrollTop >= 1480){

            $fashionweek_box.removeClass('moveBox');

        }
    });
});

//-- 시계/쥬얼리 영역 마우스 드래그 및 클릭 / 이미지 변경 이벤트
$(document).ready(function(){

    let $jewelry_list = $('.jewelry_list');
    let $leftBtn = $('.jewelry_inner_box .arrow_left'); 
    let $rightBtn = $('.jewelry_inner_box .arrow_right');

    let currentIndex = 0; 
    let $itemWidth = $jewelry_list.outerWidth(true);
    let isDragging = false; // 드래그 상태를 추적
    let startX; // 시작 위치
    let scrollStartX; // 스크롤 시작 위치
    let mdown = false; // 마우스 다운 상태

    // 이벤트 핸들러 등록
    $('.jewelry_inner_box').on('mousedown touchstart', startJewelryDrag);
    $(document).on('mousemove touchmove', dragJewelryMove);
    $(document).on('mouseup touchend', endJewelryDrag);


    // 드래그 시작 함수
    function startJewelryDrag(event) {
        mdown = true; // 마우스 다운 상태
        isDragging = true; // 드래그 시작
        startX = event.pageX || event.originalEvent.touches[0].pageX; // 터치 이벤트 시작 위치 저장
        scrollStartX = startX; // 스크롤 시작 위치 저장
        $(this).css('cursor', 'grabbing'); // 커서 변경
        event.preventDefault(); // 기본 동작 방지
    }

    // 드래그 이동 함수
    function dragJewelryMove(event) {
        if (!mdown) return; // 마우스 다운 상태가 아니면 드래그 이동 불가
        event.preventDefault(); // 기본 스크롤 방지
    }

    // 드래그 종료 함수
    function endJewelryDrag(event) {
        if (isDragging) {
            mdown = false; // 마우스 다운 상태 종료
            isDragging = false; // 드래그 종료
            $(this).css('cursor', 'grab'); // 커서 변경

            // 드래그 완료 후 인덱스 조정
            let moveX = (event.pageX || event.changedTouches[0].pageX) - scrollStartX; // 이동 거리 계산
            if (Math.abs(moveX) > $itemWidth / 3) { // 이동 거리가 아이템의 1/3 이상일 경우
                if (moveX < 0 && currentIndex < $jewelry_list.length - 3) {
                    currentIndex++; // 오른쪽으로 이동
                } else if (moveX > 0 && currentIndex > 0) {
                    currentIndex--; // 왼쪽으로 이동
                }
            }

            // 애니메이션으로 이동
            $('.jewelry_inner_box .list_contents').animate({
                marginLeft: -currentIndex * $itemWidth
            }, 300);
        }
    }

    // 좌측 버튼 클릭 시
    $leftBtn.click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            $('.jewelry_inner_box .list_contents').animate({
                marginLeft: -currentIndex * $itemWidth
            }, 300);
        }
    });

    // 우측 버튼 클릭 시
    $rightBtn.click(function() {
        if (currentIndex < $jewelry_list.length - 3) { // 3은 보이는 아이템 수
            currentIndex++;
            $('.jewelry_inner_box .list_contents').animate({
                marginLeft: -currentIndex * $itemWidth
            }, 300);
        }
    });

    // 이미지 변경 이벤트
    // 이미지 경로 배열로 저장
    let imagePaths = [
        'img/fashion-PG/sec-watchJewelry/jewelry-list-1.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-2.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-3.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-4.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-5.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-6.jpg'
    ];

    let hoverImagePaths = [
        'img/fashion-PG/sec-watchJewelry/jewelry-list-1-hv.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-2-hv.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-3-hv.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-4-hv.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-5-hv.jpg',
        'img/fashion-PG/sec-watchJewelry/jewelry-list-6-hv.jpg'
    ];

    $('.jewelry_list').hover(function() {    // 마우스 엔터 시

        let index = $(this).index(); // fashion_list 인덱스 가져오기

        if (index >= 0 && index < imagePaths.length) {

            let $img = $(this).find('img');

            $img.attr('src', hoverImagePaths[index]); 

        }
    }, function() { // 마우스 리브 시
        
        let index = $(this).index(); 

        if (index >= 0 && index < imagePaths.length) {

            let $img = $(this).find('img');

            $img.attr('src', imagePaths[index]);

        }
    });

    let $bigBox = $('.jewelry_wrap .big_box');

    $bigBox.hover(function() {  // 마우스 엔터 시
        
        let $img = $(this).find('img');

            $img.attr('src', 'img/fashion-PG/sec-watchJewelry/big-imges-hv.jpg'); // 이미지 소스 변경
    
    }, function() { // 마우스 리브 시
        
        let $img = $(this).find('img');

            $img.attr('src', 'img/fashion-PG/sec-watchJewelry/big-imges.jpg'); // 이미지 소스 변경 
    
    });

});

//-- 셀럽 스타일 영역
$(document).ready(function(){

    let $celebList = $('.celebstyle_list');

    $celebList.hover(function(){    //마우스 엔터 시 
        $celebList.removeClass('hoverBox');
        $(this).addClass('hoverBox');

    }, function(){
        $(this).removeClass('hoverBox');    //마우스 리브 시
    });

});