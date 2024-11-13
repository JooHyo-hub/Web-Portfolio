//--헤더 이벤트
$(document).ready(function(){

    //네비게이션
    let $header = $('header');
    let $topInnerBox = $('.top_element_wrap');
    let $nav = $('nav');
    let $mainmenu = $('.mainmwnu_wrap > li > a');
    let $submenuBox = $('.submenu_wrap');
    let $submenu = $('.submenu_wrap > div');

    //기본 서브메뉴 숨기기
    $submenu.addClass('hide-submenu');

    //메인메뉴에 마우스 올리면 실행
    $mainmenu.mouseover(function(){

        // 현재 메뉴의 인덱스 저장 = li의 순서를 가져옴
        let index = $(this).parent().index();

        //이벤트 호출
        submenu(index);
    });

    //이벤트 구현
    function submenu(index){

        $submenu.addClass('hide-submenu');

        $topInnerBox.css('height', '130px');
        $submenuBox.css('display', 'block');

        // 적절한 서브 메뉴만 표시하고 레이어 가장 위로 올림,
        if (index === 0) {
            $submenu.removeClass('show-submenu');
            $submenu.eq(0).removeClass('hide-submenu').addClass('show-submenu');
        }
        else if (index === 1) {
            $submenu.removeClass('show-submenu');
            $submenu.eq(1).removeClass('hide-submenu').addClass('show-submenu');
        }
        else if (index === 3) {
            $submenu.removeClass('show-submenu');
            $submenu.eq(2).removeClass('hide-submenu').addClass('show-submenu');
        }
        //해당 메인메뉴에 올라가면 박스 복구 후 함수 종료
        else if (index === 2 || index === 4) {
            $topInnerBox.css('height', '88px'); 
            $submenuBox.css('display', 'none'); 
            return;
        }
    }

    // 마우스 아웃 시 서브 메뉴 숨기기
    $nav.mouseleave(function(){
        $topInnerBox.css('height', '88px'); 
        $submenuBox.css('display', 'none');
        $submenu.addClass('hide-submenu');
    });
        
});