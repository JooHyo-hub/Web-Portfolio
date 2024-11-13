//-- 라이징 트랜드 영역
$(document).ready(function(){
    let $titleBox = $('.tit_txt_box > h1');
    let $detailBox = $('.tit_txt_box > p');

    $titleBox.css({'left' : '0'});
    $detailBox.css({'left' : '0'});
});

//--더보기 버튼 클릭
$(document).ready(function(){

    let $moreBox_btn = $('.moreBox_btn');
    let $itemBox = $('.item_wrap_box2');

    $moreBox_btn.click(function(){
        $itemBox.removeClass('boxNone');
        $(this).css({'opacity' : '0'});
    });

});