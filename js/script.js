window.onload = function() {


      var w = $(window).width();
      var h = $(window).height();
      var innerH = $(window).innerHeight();
      // console.log('画面幅 '+ w );
      // console.log('画面高さ '+ h );
      // console.log('画面内側高さ '+ innerH );

  /*--------------------------------------------------------------------------------- スムーススクロール */

    $('a[href^="#"]').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });

  /*--------------------------------------------------------------------------------- pagetop */

    //50px以上スクロールしたらpagetopボタン表示、それ以外は非表示
    var gotop = $('#c-gotop');

    $(window).scroll(function (){

      if ($(this).scrollTop() > 50) {

        gotop.addClass('is-show'); //pagetopボタン表示

      } else {

        gotop.removeClass('is-show'); //pagetopボタン非表示

      }

    });


  /*--------------------------------------------------------------------------------- モーダル */
    //モーダルリサイズ関数
    function modalResize(modal){

      var w = $(window).width();
      var h = $(window).height();
      var cw = $(modal).outerWidth();
      var ch = $(modal).outerHeight();
      var scrollTop = $(window).scrollTop();
      var modalTop = scrollTop;
      // console.log(w+'w');
      // console.log(h+'h');
      // console.log(cw+'cw');
      // console.log(ch+'ch');

      $(modal).css({
        "left": ((w - cw)/2) + "px",
        "top":((h - ch)/2) + "px"
      });

    }

    //モーダルを閉じる関数
    function modalClose(modal) {

      // 「.#c-modal-overlay」あるいは「.js-modal-close」をクリックした時モーダル非表示
      $('#c-modal-overlay,.js-modal-close').off().click(function(){

        // モーダルコンテンツとオーバーレイをフェードアウト
        $(modal).fadeOut(500);
        $('#c-modal-overlay').fadeOut();

      });

    }


    //モーダルを開く関数
    function modalOpen(modal) {

    //現在のスクロール位置取得
      scrollPosition = $(window).scrollTop(); //現在のスクロール位置を取得

      // モーダルコンテンツのIDを取得
      // var modal = '.' + obj.attr('data-target');
      $(modal).fadeIn('slow');
      // console.log('modal ' + modal);

      // オーバーレイをフェードイン
      $('#c-modal-overlay').fadeIn(500);

       // モーダルコンテンツフェードイン
      $(modal).fadeIn('slow');

      // // モーダルコンテンツの表示位置を設定
      modalResize(modal);

      // リサイズしたらモーダルコンテンツの表示位置を変更
      $(window).on('resize', function(){
        modalResize(modal);
      });

      modalClose(modal);

      return modal;

    }


    //ヒントボタンをクリックした時 モーダルを開く
    $('.js-modal-open').on('click', function(){


      // 開くモーダル要素のIDを取得
      var modal = '.' + $(this).attr('data-target');
      // console.log('modal ' + modal);

      //モーダルを開く
      modalOpen(modal);

    });




  /*--------------------------------------------------------------------------------- special スライダー */

   $('.p-special__comics__slider').slick({
      arrows: true, // 前・次のボタンを表示する,
      swipe: true,
      infinite: false,
    });


  /*--------------------------------------------------------------------------------- question */


   $('#submit').click(function() {

      //設問の番号
      var questionNum = $(this).attr('data-id').replace('q','');
      //入力された値
      var inputAnswer = $('#q' + questionNum + '_input').val();

      // console.log('questionNum ' + questionNum);
      // console.log('inputAnswer ' + inputAnswer);

      //正解の配列
      var answer = [] ;


      //設問の番号によって答えを定義
      switch (questionNum) {
        case "1":
          answer = [ "ナニカ" , "ﾅﾆｶ" , "なにか" ];
          break;
        case "2":
          answer = [ "しせん" , "視線" , "シセン" , "ｼｾﾝ" ];
          break;
        case "3":
          answer = [ "空" ];
          break;
        case "4":
          answer = [ "テンジョウ" , "天井" , "てんじょう" , "ﾃﾝｼﾞｮｳ" ];
          break;
        case "5":
          answer = [ "だるまづか" , "達磨塚" , "ダルマヅカ" , "ﾀﾞﾙﾏﾂﾞｶ" ];
          break;

        default:

      }

      // console.log('answer ' + answer);

      //入力された値が正解の配列の中に含まれている場合
      if( answer.includes(inputAnswer)) {

        if(!localStorage.getItem("q" + questionNum)){

          localStorage.setItem("q" + questionNum, "correct"); //ローカルストレージに再生履歴を保存

        }

        location.href = "correct.html";

      } else {

      //入力された値が正解の配列の中に含まれていない場合

        var modal = '.modal-incorrect' + questionNum;

        modalOpen(modal);

      }

   });

  /*--------------------------------------------------------------------------------- 正解ページリダイレクト */

   //正解ページにアクセスしたとき 正解履歴がないと問題ページにリダイレクト
   if($('.p-correct').length) {

    var qusestionCorrectNum = $('.p-correct').attr('data-num');
    // console.log(qusestionCorrectNum);


    if(localStorage.getItem(qusestionCorrectNum) ) {

        $('.p-correct').addClass('is-show');

       } else {

      // alert('正解した履歴がありません。正解していない問題をクリアしてください。');
      location.href = "https://promo.kadokawa.co.jp/hikarugashinda/special/special3/";

    }


   }

  /*--------------------------------------------------------------------------------- TOP ローディング */

    //TOPページのみ
    var loading = $('.p-special__movie'),
        loadingVideo = document.getElementById('video'),
        body = $(body),
        page = $('.p-special-top');


    if(loading.length) {

      loading.css('height', innerH + 'px');

      loadingVideo.pause();

    //TOP オープニング再生時にローカルストレージに再生履歴を保存
      if(!localStorage.getItem("opening-play")){

        loading.addClass('is-show');
        page.addClass('is-show');
        body.addClass('is-fixed'); //bodyにis-fixedクラス付加

        setTimeout(function(){

          loadingVideo.play();

        },1000);

        setTimeout(function(){

          loading.fadeOut(700);
          localStorage.setItem("opening-play", "check"); //ローカルストレージに再生履歴を保存

        },6000);

      } else {
        loading.remove();
        page.addClass('is-show');
      }

    }


  /*--------------------------------------------------------------------------------- シェア */
    // var shareUrl = location.href; // 現在のページURL
    // var shareTitle = encodeURI(document.title); // 現在のページタイトル
    // var shareUrlEncode = encodeURI(shareUrl);
    // // console.log(shareUrl);
    // shareTitle = shareTitle.replace('&','%26').replace('#','%23'); //タイトルの&、#はエンコード
    // // console.log(shareTitle);

    // var fbShareUrl = 'http://www.facebook.com/share.php?u='+location.href;
    // var twShareUrl = 'https://twitter.com/intent/tweet?url='+location.href+'&text='+shareTitle;
    // var liShareUrl = 'http://line.me/R/msg/text/?'+shareTitle+'%0D%0A'+shareUrlEncode;

    // // console.log(fbShareUrl);
    // // console.log(twShareUrl);
    // console.log(liShareUrl);

    // $('.u-facebook.js-share').attr("href",fbShareUrl);
    // $('.u-twitter.js-share').attr("href",twShareUrl);
    // $('.u-line.js-share').attr("href",liShareUrl);


    //不正解ページ用
    // var twShareUrlIncorrect = 'https://twitter.com/intent/tweet?url='+location.href+'incorrect.html&text='+shareTitle;
    // var liShareUrlIncorrect = 'http://line.me/R/msg/text/?'+ shareTitle +'%0a'+ shareUrlEncode + 'incorrect.html';

    // var liShareUrlIncorrect = 'https://timeline.line.me/social-plugin/share?url='+ shareUrl +'incorrect.html&text=' + shareTitle;
    // console.log(liShareUrlIncorrect);


    // $('.u-facebook.js-share').attr("href",fbShareUrl);
    // $('.u-twitter-incorrect.js-share').attr("href",twShareUrlIncorrect);
    // $('.u-line-incorrect.js-share').attr("href",liShareUrlIncorrect);



  /*---------------------------------------------------------------------------------  about フェードイン*/
  $(window).on('load scroll resize',function(){
    var delayHeight = 100;
    $('.p-top__story').each(function(){
      var setThis = $(this),
      elmTop = setThis.offset().top,
      elmHeight = setThis.height(),
      scrTop = $(window).scrollTop(),
      winHeight = $(window).height();
      if (scrTop > elmTop - winHeight + delayHeight && scrTop < elmTop + elmHeight){
        setThis.addClass('is-show');
      }
    });
  });

  /*---------------------------------------------------------------------------------   */


};
