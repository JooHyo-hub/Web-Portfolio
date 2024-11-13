//--헤더 스크롤 이벤트
$(document).ready(function(){

    let $header = $('header');

    showHead();

    //스크롤 이벤트
    $(window).scroll(function(){

        showHead();

    });

    function showHead(){

        let $scrollTop = $(window).scrollTop();

        if ($scrollTop > 600) {
            $header.removeClass('none_head');
            $header.addClass('show_head');
        }
        else if($scrollTop <= 600){
            $header.removeClass('show_head');
            $header.addClass('none_head');
        }
    }
        
});

//--메인 카테고리 이벤트
$(document).ready(function(){

    let $add_column = $('.add_column');
    let $main_category = $('.main_category');

    $add_column.addClass('addHide');

    $main_category.click(function(){
        let $sub_category = $(this).children('.sub_category');
        let $add_column = $(this).find('.add_column');

        // 서브 카테고리 슬라이드 토글
        $sub_category.slideToggle(300, function() {
            
            if ($sub_category.is(':visible')) {
                $add_column.addClass('addHide');
            }
            else {
                $add_column.removeClass('addHide');
            }
        });
    }); 

});

//--슬라이드 이벤트
$(document).ready(function() {
    let currentIndex = 0;
    let slides = $('.slide_list_box');
    let totalSlides = slides.length;
    let pagenationElements = $('.pagenation_container span');
    $(slides[currentIndex]).css('opacity', 1);  // 첫번째 이미지 보임
    $(slides[currentIndex]).find('img').css('transform', 'scale(1.1)'); // 이미지 확대



    //페이드 아웃, 페이드인, 이미지 확대
    function showSlide(index) {

        //슬라이드 이미지 점점 나타남
        $(slides[currentIndex]).animate({ opacity: 0 }, 800, function() {
            $(this).css('opacity', 0); // 페이드 아웃 후 투명처리
        });

        $(slides[index]).animate({ opacity: 1 }, 800); // 페이드 인

        $(slides[index]).find('img').css('transform', 'scale(1.1)'); // 이미지 확대

        currentIndex = index; //변수에 저장

        // 페이지네이션 업데이트
        pagenationElements.removeClass('present_Page').addClass('deactivate_Page');
        pagenationElements.eq(currentIndex).removeClass('deactivate_Page').addClass('present_Page');

    }

    // 5초 마다 슬라이드 재생
    setInterval(function() {
        let nextIndex = (currentIndex + 1) % totalSlides;   //슬라이드 길이만큼 증가
        showSlide(nextIndex);   //이벤트 호출
    }, 5000); 

    // 마우스 드래그 이벤트
    let isDragging = false;
    let startX;

    $('.slide_wrap-M').on('mousedown touchstart', function(e) {
        isDragging = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
    });

    $(document).on('mousemove touchmove', function(e) {
        if (!isDragging) return;
        const x = e.pageX || e.originalEvent.touches[0].pageX;
        const diffX = startX - x;

        if (diffX > 50) { // 오른쪽으로 드래그
            showSlide((currentIndex + 1) % totalSlides);
            isDragging = false;
        } else if (diffX < -50) { // 왼쪽으로 드래그
            showSlide((currentIndex - 1 + totalSlides) % totalSlides);
            isDragging = false;
        }
    });

    $(document).on('mouseup touchend', function() {
        isDragging = false;
    });

    // 페이지네이션 클릭 이벤트
    pagenationElements.on('click', function() {
        const index = $(this).index();
        showSlide(index);
    });
});

//--패션 영역 드래그 및 버튼 클릭
$(document).ready(function() {
    // 패션 영역 변수
    let $fashionItems = $('.fashion_list');
    let $fashion_leftBtn = $('.fashion_left_btn');
    let $fashion_rightBtn = $('.fashion_right_btn');

    let fashionCurrentIndex = 0; 
    let $fashionItemWidth = $fashionItems.outerWidth(true);
    let isFashionDragging = false;
    let fashionStartX;
    let fashionScrollStartX;
    let fashionMdown = false;

    // 패션 영역 이벤트 핸들러 등록
    $('.fashion_inner_box').on('mousedown touchstart', startFashionDrag);
    $(document).on('mousemove touchmove', dragFashionMove);
    $(document).on('mouseup touchend', endFashionDrag);

    // 드래그 시작 함수 (패션)
    function startFashionDrag(event) {
        fashionMdown = true;
        isFashionDragging = true;
        fashionStartX = event.pageX || event.originalEvent.touches[0].pageX;
        fashionScrollStartX = fashionStartX;
        $(this).css('cursor', 'grabbing');
        event.preventDefault();
    }

    // 드래그 이동 함수 (패션)
    function dragFashionMove(event) {
        if (!fashionMdown) return;
        event.preventDefault();
    }

    // 드래그 종료 함수 (패션)
    function endFashionDrag(event) {
        if (isFashionDragging) {
            fashionMdown = false;
            isFashionDragging = false;
            $(this).css('cursor', 'grab');

            let moveX = (event.pageX || event.changedTouches[0].pageX) - fashionScrollStartX;
            if (Math.abs(moveX) > $fashionItemWidth / 3) {
                if (moveX < 0 && fashionCurrentIndex < $fashionItems.length - 3) {
                    fashionCurrentIndex++;
                } else if (moveX > 0 && fashionCurrentIndex > 0) {
                    fashionCurrentIndex--;
                }
            }

            $('.fashion_move_box').animate({
                marginLeft: -fashionCurrentIndex * $fashionItemWidth
            }, 300);
        }
    }

    // 좌측 버튼 클릭 시 (패션)
    $fashion_leftBtn.click(function() {
        if (fashionCurrentIndex > 0) {
            fashionCurrentIndex--;
            $('.fashion_move_box').animate({
                marginLeft: -fashionCurrentIndex * $fashionItemWidth
            }, 300);
        }
    });

    // 우측 버튼 클릭 시 (패션)
    $fashion_rightBtn.click(function() {
        if (fashionCurrentIndex < $fashionItems.length - 3) {
            fashionCurrentIndex++;
            $('.fashion_move_box').animate({
                marginLeft: -fashionCurrentIndex * $fashionItemWidth
            }, 300);
        }
    });
});

//--뷰티 영역 마우스 드래그 및 버튼 클릭
$(document).ready(function(){
    // 뷰티 영역 변수
    let $beautyItems = $('.beauty_list');
    let $beauty_leftBtn = $('.beauty_left_btn'); 
    let $beauty_rightBtn = $('.beauty_right_btn');

    let $beautyItemWidth = $beautyItems.outerWidth(true);
    let beautyCurrentIndex = 0; 
    let isBeautyDragging = false; 
    let beautyStartX; 
    let beautyScrollStartX; 
    let beautyMdown = false; 

    // 뷰티 영역 이벤트 핸들러 등록
    $('.beauty_inner_box').on('mousedown touchstart', startBeautyDrag);
    $(document).on('mousemove touchmove', dragBeautyMove);
    $(document).on('mouseup touchend', endBeautyDrag);

    // 드래그 시작 함수 (뷰티)
    function startBeautyDrag(event) {
        beautyMdown = true;
        isBeautyDragging = true;
        beautyStartX = event.pageX || event.originalEvent.touches[0].pageX;
        beautyScrollStartX = beautyStartX;
        $(this).css('cursor', 'grabbing');
        event.preventDefault();
    }

    // 드래그 이동 함수 (뷰티)
    function dragBeautyMove(event) {
        if (!beautyMdown) return;
        event.preventDefault();
    }

    // 드래그 종료 함수 (뷰티)
    function endBeautyDrag(event) {
        if (isBeautyDragging) {
            beautyMdown = false;
            isBeautyDragging = false;
            $(this).css('cursor', 'grab');

            let moveX = (event.pageX || event.changedTouches[0].pageX) - beautyScrollStartX;
            if (Math.abs(moveX) > $beautyItemWidth / 3) {
                if (moveX < 0 && beautyCurrentIndex < $beautyItems.length - 3) {
                    beautyCurrentIndex++;
                } else if (moveX > 0 && beautyCurrentIndex > 0) {
                    beautyCurrentIndex--;
                }
            }

            $('.beauty_move_box').animate({
                marginLeft: -beautyCurrentIndex * $beautyItemWidth
            }, 300);
        }
    }

    // 좌측 버튼 클릭 시 (뷰티)
    $beauty_leftBtn.click(function() {
        if (beautyCurrentIndex > 0) {
            beautyCurrentIndex--;
            $('.beauty_move_box').animate({
                marginLeft: -beautyCurrentIndex * $beautyItemWidth
            }, 300);
        }
    });

    // 우측 버튼 클릭 시 (뷰티)
    $beauty_rightBtn.click(function() {
        if (beautyCurrentIndex < $beautyItems.length - 3) {
            beautyCurrentIndex++;
            $('.beauty_move_box').animate({
                marginLeft: -beautyCurrentIndex * $beautyItemWidth
            }, 300);
        }
    });
});

//--데코 영역 마우스 드래그 및 버튼 클릭
$(document).ready(function(){
    // 데코 영역 변수
    let $decoItems = $('.deco_list');
    let $deco_leftBtn = $('.deco_left_btn'); 
    let $deco_rightBtn = $('.deco_right_btn'); 
    
    let $decoItemWidth = $decoItems.outerWidth(true);
    let decoCurrentIndex = 0; 
    let isDecoDragging = false; 
    let decoStartX; 
    let decoScrollStartX; 
    let decoMdown = false; 

    // 데코 영역 이벤트 핸들러 등록
    $('.deco_inner_box').on('mousedown touchstart', startDecoDrag);
    $(document).on('mousemove touchmove', dragDecoMove);
    $(document).on('mouseup touchend', endDecoDrag);

    // 드래그 시작 함수 (데코)
    function startDecoDrag(event) {
        decoMdown = true;
        isDecoDragging = true;
        decoStartX = event.pageX || event.originalEvent.touches[0].pageX;
        decoScrollStartX = decoStartX;
        $(this).css('cursor', 'grabbing');
        event.preventDefault();
    }

    // 드래그 이동 함수 (데코)
    function dragDecoMove(event) {
        if (!decoMdown) return;
        event.preventDefault();
    }

    // 드래그 종료 함수 (데코)
    function endDecoDrag(event) {
        if (isDecoDragging) {
            decoMdown = false;
            isDecoDragging = false;
            $(this).css('cursor', 'grab');

            let moveX = (event.pageX || event.changedTouches[0].pageX) - decoScrollStartX;
            if (Math.abs(moveX) > $decoItemWidth / 3) {
                if (moveX < 0 && decoCurrentIndex < $decoItems.length - 3) {
                    decoCurrentIndex++;
                } else if (moveX > 0 && decoCurrentIndex > 0) {
                    decoCurrentIndex--;
                }
            }

            $('.deco_move_box').animate({
                marginLeft: -decoCurrentIndex * $decoItemWidth
            }, 300);
        }
    }

    // 좌측 버튼 클릭 시 (데코)
    $deco_leftBtn.click(function() {
        if (decoCurrentIndex > 0) {
            decoCurrentIndex--;
            $('.deco_move_box').animate({
                marginLeft: -decoCurrentIndex * $decoItemWidth
            }, 300);
        }
    });

    // 우측 버튼 클릭 시 (데코)
    $deco_rightBtn.click(function() {
        if (decoCurrentIndex < $decoItems.length - 3) {
            decoCurrentIndex++;
            $('.deco_move_box').animate({
                marginLeft: -decoCurrentIndex * $decoItemWidth
            }, 300);
        }
    });
});

//--패션 영역 이미지 변경
$(document).ready(function(){

    // 이미지 변경 이벤트
    // 이미지 경로 배열로 저장
    let fashion_oriImage = [
        'img/main-PG/sec-fashoin/fashion-list-2.jpg',
        'img/main-PG/sec-fashoin/fashion-list-3.jpg',
        'img/main-PG/sec-fashoin/fashion-list-4.jpg',
        'img/main-PG/sec-fashoin/fashion-list-5.jpg',
        'img/main-PG/sec-fashoin/fashion-list-6.jpg',
        'img/main-PG/sec-fashoin/fashion-list-7.jpg'
    ];

    let fashion_hoverImage = [
        'img/main-PG/sec-fashoin/fashion-list-2-hv.jpg',
        'img/main-PG/sec-fashoin/fashion-list-3-hv.jpg',
        'img/main-PG/sec-fashoin/fashion-list-4-hv.jpg',
        'img/main-PG/sec-fashoin/fashion-list-5-hv.jpg',
        'img/main-PG/sec-fashoin/fashion-list-6-hv.jpg',
        'img/main-PG/sec-fashoin/fashion-list-7-hv.jpg'
    ];

    $('.fashion_list').hover(function() {    // 마우스 엔터 시

        let index = $(this).index(); // fashion_list 인덱스 가져오기

        if (index >= 0 && index < fashion_oriImage.length) {

            let $img = $(this).find('img');

            $img.attr('src', fashion_hoverImage[index]); 

        }
    }, function() { // 마우스 리브 시
        
        let index = $(this).index(); 

        if (index >= 0 && index < fashion_oriImage.length) {

            let $img = $(this).find('img');

            $img.attr('src', fashion_oriImage[index]);

        }
    });

    let $bigBox = $('.fashion_inner_box .big_box');

    $bigBox.hover(function() {  // 마우스 엔터 시
        
        let $img = $(this).find('img');

            $img.attr('src', 'img/main-PG/sec-fashoin/fashion-list-1-hv.jpg'); // 이미지 소스 변경
    
    }, function() { // 마우스 리브 시
        
        let $img = $(this).find('img');

            $img.attr('src', 'img/main-PG/sec-fashoin/fashion-list-1.jpg'); // 이미지 소스 변경 
    
    });

});

//--뷰티 영역 이미지 변경
$(document).ready(function(){

    // 이미지 변경 이벤트
    // 이미지 경로 배열로 저장
    let imagePaths = [
        'img/main-PG/sec-beauty/beauty-list-img1.jpg',
        'img/main-PG/sec-beauty/beauty-list-img2.jpg',
        'img/main-PG/sec-beauty/beauty-list-img3.png',
        'img/main-PG/sec-beauty/beauty-list-img4.jpg',
        'img/main-PG/sec-beauty/beauty-list-img5.jpg',
        'img/main-PG/sec-beauty/beauty-list-img6.jpg'
    ];

    let hoverImagePaths = [
        'img/main-PG/sec-beauty/beauty-list-img1-hv.jpg',
        'img/main-PG/sec-beauty/beauty-list-img2-hv.jpg',
        'img/main-PG/sec-beauty/beauty-list-img3-hv.jpg',
        'img/main-PG/sec-beauty/beauty-list-img4-hv.jpg',
        'img/main-PG/sec-beauty/beauty-list-img5-hv.jpg',
        'img/main-PG/sec-beauty/beauty-list-img6-hv.jpg'
    ];

    $('.beauty_list').hover(function() {    // 마우스 엔터 시

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

    let $bigBox = $('.beauty_inner_box .big_box');

    $bigBox.hover(function() {  // 마우스 엔터 시
        
        let $img = $(this).find('img');

            $img.attr('src', 'img/main-PG/sec-beauty/big-box-img-hv.jpg'); // 이미지 소스 변경
    
    }, function() { // 마우스 리브 시
        
        let $img = $(this).find('img');

            $img.attr('src', 'img/main-PG/sec-beauty/big-box-img.jpg'); // 이미지 소스 변경 
    
    });

});

//--투데이 픽 영역
$(document).ready(function(){

    let $pickBox = $('.pick_container');

    let $viewBtn = $('.view_btn_box');

    $viewBtn.css('opacity', '0');   //초기값

    $pickBox.hover(function(){  //마우스 엔터 시
        $(this).find('img').css('transform', 'scale(1.1)');

        $(this).find('.view_btn_box').css({
            'opacity': '1',
        });

    }, function(){  //마우스 리브 시

        $(this).find('img').css('transform', 'scale(1)');

        $(this).find('.view_btn_box').css({
            'opacity': '0',
        });
    });
});

//--위클리 베스트 영역
$(document).ready(function() {

    let $Best_Item = $('.Best_Item_container');

    $Best_Item.addClass('weeklyBox_non');   //초기값 숨김 처리

    moveImg();
    
    //스크롤 이벤트
    $(window).scroll(function() {

        moveImg();

    });

    //스크롤시 이미지 이동 이벤트
    function moveImg(){

        let $scrollTop = $(window).scrollTop();

        if ($scrollTop >= 3000) {

            $Best_Item.each(function(index) {   //each : 선택한 요소 집합에 대해 반복

                let $this = $(this);

                setTimeout(function() {
                    $this.removeClass('weeklyBox_non');
                }, index * 500);    //0.5초마다 실행
            
            });
        }

    }

    //이미지 호버 이벤트
    let $Best_Item_Img = $('.Best_Item_img');

    $Best_Item_Img.hover(function() {

        $(this).find('img').css('transform', 'scale(1.1)');

    }, function() {
        
        $(this).find('img').css('transform', 'scale(1)');
    });

});

//--스타 영역
$(document).ready(function() {

    let $celub_Img = $('.celebrity-Img');

    //이미지 호버 이벤트
    $celub_Img.hover(function() {

        $(this).find('img').css('transform', 'scale(1.1)');

    }, function() {
        
        $(this).find('img').css('transform', 'scale(1)');
    });

});