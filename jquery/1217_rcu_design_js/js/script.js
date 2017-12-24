//DOMの読み込み
$(function(){
    console.log('読み込んだよ！');


    //----------グローバル変数--------------
    //window幅,高さの指定
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    //navの高さ
    var navContainerTop = $('.nav-container').offset().top;
    //console.log('navContainerTop: ' + navContainerTop);

    //worksContainerの高さ
    var worksContainerTop = $('.works-container').offset().top;
    //console.log('worksContainerTop: ' + worksContainerTop);

    //newsContainerの高さを取得
    var newsContainerTop = $('.news-container').offset().top;

    //----------スクロールイベント-------------
    $(window).on('scroll',function(){
        console.log('スクロールしている');//スクロールしている時だけ動作する


        //上からのスクロール値
        //var dy = $(this);//これだけだと色々な数値を確認できる
        //windowの座標を確認
        var dy = $(this).scrollTop();
        console.log('dy:' + dy);


        //-----------navの固定-------------------|
        //PCのサイズのみヘッダー固定
        if (windowWidth > 767){
            //もしdyがnavContainerTop以上になったら
            if (dy >= navContainerTop) {
                $('header nav').addClass('nav-fixed');
            } else {
                $('header nav').removeClass('nav-fixed');
            }
        }

        //-------スクロールのフェードアニメーション-------------------|
        //---------Worksの表示-----------------------|
        //dyがworksContainerTop - windowの高さを引いた値になったら
        if(dy >= worksContainerTop - windowHeight){
            //console.log('worksContainerTopだよ');
            $('.works-container').find('section').addClass('fade-in');
        }

        //---------Newsの表示-----------------------|
        //dyがnewsContainerTop - windowの高さを引いた値になったら
        if(dy >= newsContainerTop - windowHeight){
            console.log('newsContainerTopだよ');
            $('.news-container').find('section').addClass('fade-in-up');
        }
    });

    //---------------TOPスライドショー-----------------------------------|
    //1) 良く利用するslide-show,slide-pagingを変数に保存
    var slideShow = $('#slide-show');
    var slideLength = slideShow.find('li').length;//liの数
    var slidePaging = $('#slide-paging');

    //2) 今何番目のリストにいるのか？次は何番に行くのか？その2つの番号を管理する → 0から進んで1づつ進む
    //現状の番号
    var currentIndex = -1; //最初に1個進めたい　０から始めたい

    var timer; //時間を制御する変数

    changeSlide(0); //0番から出す

     //★画像を切り替える関数
     function changeSlide(newIndex){

         //現在の番号は飛ばすように（押せないように）（●アイコンを押せない）
         if(currentIndex === newIndex){
             return; //ここで終わり
         }

         //いったんタイマーを停止する
         if(timer){
             clearTimeout(timer);
             timer = null; //timerの値を空にする
         }

         if(currentIndex >= 0){
             //現在表示している写真を1秒でopacity: 0にする →自分自信が消える
             slideShow.find('li:eq('+currentIndex+')').animate({opacity:0},1000);
         }

         //次の写真(newIndex)を1秒でopacity:1にする
         slideShow.find('li:eq('+newIndex+')').animate({opacity:1},1000);
         currentIndex = newIndex; //自分の番号を次の番号に更新

         //ページングの指定（●アイコンの動き）
         slidePaging.find('li').each(function(index){ //eachで順々に周る
            $(this).removeClass('selected');//全てのliに「selected」がついてしまうので、現状のアイコンからいったん消して、次のアイコンにもselectedを付与する
            if(index == currentIndex){
                $(this).addClass('selected');
            }
         });

         //タイマー
         timer = setTimeout(nextIndex, 4000);

     }

     //★番号を進める関数
     function nextIndex(){
         var newIndex = currentIndex +1;//次の番号
         if(newIndex >= slideLength){  //スライドの枚数は3枚なので、3枚以上の場合は0に戻る
             newIndex = 0;
         }
         //引数　changeSlideを呼び戻し:changeSlideとnextIndexがぐるぐる周るから！！
         changeSlide(newIndex);
     }

     //クリックイベント ●アイコンをクリックした時の挙動
     slidePaging.find('li').each(function(index){
         $(this).on('click',function(){
             //liの押した番号をchangeSlideに渡す
             changeSlide(index);
         });
     });


     //----------windowをリサイズ(幅を変化させたら)したら------------------|
     $(window).on('resize', function(){
         console.log('リサイズ');
         windowWidth = $(window).width(); //リサイズした後のwindowWidthを上書き
         if(windowWidth > 767){
             //PC画面

         } else {
             //mobile画面

         }

     });

     //-----------Responsive navi（ハンバーガーメニュー）ーーーーーーー|
     //開く
     $('.mobile-menu').on('click',function(){
        console.log('ハンバーガー押されたよ');
        $('header nav').addClass('mobile-menu-open').addClass('fade-in');
     });
     //閉じる
     $('.mobile-close').on('click',function(){
        $('header nav').removeClass('mobile-menu-open').removeClass('fade-in');
     });


});


/*　アニメーション
0) jsファイルの作成と、リンク紐付け

1) /*スクロールフェードのために非表示にする
CSSの　.works sectionを非表示にする
opacityを0に！

※display noneだと表示にした分だけ下が上に詰まってしまう！

2) スクロールイベントの記述

------------------------------------------------
★スクロールが特定の部分まで来たら、ヘッダーを固定する
--------------------------------------------------

１）CSSに下記を追加
 .nav-fixed{
    position: fixed;
    top: 0;
    background: rgba(255,255,255,.0.99);
}


2)　navの高さの取得
3) if文の指定
４）PCのみ表示させる




news
1) CSS
.news section{
    width: 360px;
    height: 420px;
    background-color: #FFF;
    opacity: 0;
}

.news section:nth-child(2){
    animation-duration: 0.5;
}

.news section:nth-child(3){
    animation-duration: 1;
}


2)グローバル変数で newsContainerの高さ設定



★ーーーーーーーーTOPのスライドショー---------
＜header>
    <ul>//スライドショーの写真
    </ul>
    <ul>//スライドショーの●
    </ul>
</header>


<header>
    <!-- スライドショー-->
    <ul id="slide-show">
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <ul id="slide-paging">
        <li></li>
        <li></li>
        <li></li>
    </ul>

※3枚を同じ場所に重ねて透明にしている

*/
