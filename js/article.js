//--메인 카테고리 이벤트
$(document).ready(function(){

    let $add_column = $('.add_column');
    let $main_category = $('.main_category');
    let $sub_category = $('.sub_category');

    //초기 설정
    $add_column.removeClass('addHide');
    $sub_category.css({'display': 'none'});

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

//--추가 기사 영역
$(document).ready(function(){
    let $fashionBtn = $('.fashionBtn');
    let $styleBtn = $('.styleBtn');
    let $fashionBox = $('.fashion_keyword_wrap');
    let $styleBox = $('.style_keyword_wrap');

    //초기 설정
    $fashionBtn.addClass('focus');
    $styleBtn.addClass('nonFocus');
    $fashionBox.css({'z-index': '1'});
    $styleBox.addClass('listNone');

    //스타일 버튼 클릭 시
    $styleBtn.click(function(){
        $(this).removeClass('nonFocus').addClass('focus');
        $fashionBtn.removeClass('focus').addClass('nonFocus');

        $styleBox.removeClass('listNone').addClass('listShow').css({'z-index': '1'});
        $fashionBox.removeClass('listShow').addClass('listNone').css({'z-index': '0'});
    });

    //패션 버튼 클릭 시
    $fashionBtn.click(function(){
        $(this).removeClass('nonFocus').addClass('focus');
        $styleBtn.removeClass('focus').addClass('nonFocus');

        $fashionBox.removeClass('listNone').addClass('listShow').css({'z-index': '1'});
        $styleBox.removeClass('listShow').addClass('listNone').css({'z-index': '0'});
    });
});