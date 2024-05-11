<script>
   (function($) {
     "use strict";
     $(".banner-slider").stepCycle({
       autoAdvance: true,
       transitionTime: 1,
       displayTime: 5,
       transition: "zoomIn",
       easing: "linear",
       childSelector: false,
       ie8CheckSelector: ".ltie9",
       showNav: false,
       transitionBegin: function() {},
       transitionComplete: function() {},
     });

     function controlSliderHeight() {
       let width = $(".banner-slider")[0].clientWidth;
       let height = (width / 37) * 7;
       $(".banner-slider").css({
         height: height,
       });
       $(".banner_image").css({
         height: height,
       });
     }
     controlSliderHeight();
     $('.custom-dropdown-selected').click(function() {
       $(this).parents('.custom-dropdown').toggleClass('show');
     });
     $(window).scroll(function() {
       $('.custom-dropdown.show').toggleClass('show');
     });
     $('.custom-dropdown').mouseleave(function() {
       $(this).removeClass('show');
     });
     $('.custom-dropdown-list-item').on('click', function() {
       let parent = $(this).parents('.custom-dropdown');
       let selected = parent.find('.custom-dropdown-selected');
       parent.find('.custom-dropdown-list-item.disabled').removeClass('disabled');
       $(this).addClass('disabled');
       $(selected).text($(this).text());
       parent.removeClass('show');
       getOdds($(this).data('reference'), function(data) {
         parent.siblings('.option-odd-list').slick('unslick');
         parent.siblings('.option-odd-list').html(data);
         initOddsSlider(parent.siblings('.option-odd-list'));
       });
     });

     function getOdds(id, callback) {
       $.get(`https://script.viserlab.com/betlab/odds-by-market/${id}`, function(data) {
         callback(data);
       });
     }
   })(jQuery);
 </script>
 <script>
   (function($) {
     "use strict"
     $('.verify-gcaptcha').on('submit', function() {
       var response = grecaptcha.getResponse();
       if (response.length == 0) {
         document.getElementById('g-recaptcha-error').innerHTML = ' < span class = "text--danger" > Captcha field is required. < /span>';
         return false;
       }
       return true;
     });
   })(jQuery);
 </script>
 <script>
   (function($) {
     "use strict";
     let betType;
     let stakeAmount;
     let totalStakeAmount;
     let auth = Number("0");
     let multiBet = Number("2");
     let singleBet = Number("1");
     initBetType();
     totalStakeInput();
     betReturnAmount();
     showEmptyMessage()

     function showEmptyMessage() {
       if (Number($('.betslip__list li').length)) {
         $('.empty-slip-message').hide();
       } else {
         $('.empty-slip-message').show();
       }
     }

     function initBetType() {
       betType = sessionStorage.getItem('type');
       if (!betType) {
         betType = singleBet;
         sessionStorage.setItem('type', betType);
       }
       $('.bet-type').find('.betTypeBtn').removeClass('active');
       $('.bet-type').find(`.betTypeBtn[data-type="${betType}"]`).addClass('active');
       controlStakeInputFields();
     }

     function controlStakeInputFields() {
       if (betType == multiBet) {
         $('.betslip__list li .betslip-right').hide();
         $('.betslip__list-odd').hide();
       } else {
         $('.betslip__list li .betslip-right').show();
         $('.betslip__list-odd').show();
       }
     }

     function betSlipCount() {
       let totalBetSlipData = $('.betslip__list li').length;
       if (!totalBetSlipData) {
         sessionStorage.removeItem('total_stake_amount');
         totalStakeInput();
         showEmptyMessage();
         return 0;
       }
       return totalBetSlipData;
     }

     function setStakeAmount(amount = 0) {
       $('.investAmount').each(function(index) {
         $(this).val(amount);
         let odd = Number($(this).closest('li').data('option_odds'));
         $(this).closest('.betslip-right').find('.bet-return-amount').text(Math.abs(amount * odd).toFixed(2))
       });
     }

     function totalStakeInput(totalStakeAmount = 0) {
       totalStakeAmount = sessionStorage.getItem('total_stake_amount');
       $('[name=total_invest]').val(totalStakeAmount);
     }

     function totalMultiBetReturnAmount() {
       let totalMultiBetReturnAmount = $('[name=total_invest]').val();
       let multiBetOdd = 1;
       $('.betslip__list li').each(function(index) {
         var odd = $(this).data('option_odds');
         multiBetOdd *= odd;
       });
       $('.total-return-amount').text(Math.abs(totalMultiBetReturnAmount * multiBetOdd).toFixed(2));
     }

     function totalSingleBetReturnAmount() {
       let totalSingleBetReturnAmount = 0;
       $('.investAmount').each(function(index) {
         var odd = Number($(this).closest('li').data('option_odds'));
         totalSingleBetReturnAmount += Number($(this).val()) * odd;
       });
       $('.total-return-amount').text(Math.abs(totalSingleBetReturnAmount).toFixed(2));
     }

     function betReturnAmount() {
       betType == multiBet ? totalMultiBetReturnAmount() : totalSingleBetReturnAmount();
     }

     function showTotalBetSlipCount(count = 0) {
       $('.bet-slip-count').text(count);
       $('.bet-count').text(count);
     }

     function skeleton(type) {
       let loader = `
	<li class="loading">
		<button class="betslip__list-close"></button>
		<div class="betslip__list-content">
			<span class="betslip__list-match"></span>
			<span class="betslip__list-team"></span>
			<span class="betslip__list-question"></span>
			<div class="betslip__list-text"></div>
		</div>
		<div class="betslip-right">
			<div class="betslip__list-ratio">
				<span></span>
			</div>
			<span class="betslip-return"></span>
		</div>
	</li>`;
       $('.betslip__list').append(loader);
       if (type == 'show') {
         $(document).find('.loading').show();
       } else {
         $(document).find('.loading').remove();
       }
     }

     function removeSessionTotalStakeAmount() {
       if (sessionStorage.getItem('total_stake_amount')) {
         sessionStorage.removeItem('total_stake_amount');
       }
     }
     $(document).on('click', '.oddBtn', function() {
       let button = $(this);
       if ($(this).hasClass('active')) {
         removeBet(button);
         return;
       }
       $('.empty-slip-message').hide();
       skeleton('show');
       let data = {
         _token: '25rgF0nGExTWpD4HaYeQJCVM64TgZNmrcfqGcelF',
         id: $(this).data('option_id'),
         type: betType
       }
       if (betType == singleBet) {
         data.amount = sessionStorage.getItem('total_stake_amount');
       }
       $.get(`https://script.viserlab.com/betlab/bet/add-to-bet-slip`, data, function(response) {
         if (response.error) {
           skeleton('hide');
           $('.empty-slip-message').show();
           notify('error', response.error);
         } else {
           button.addClass('active');
           setTimeout(() => {
             skeleton('hide');
             $('.betslip__list').append(response);
             controlStakeInputFields();
             showTotalBetSlipCount(betSlipCount())
             betReturnAmount();
           }, 500);
         }
       });
     });
     $(document).on('input focusout', '.investAmount', function(event) {
       $('.total-validation-msg').text('');
       $('.total-stake-amount').text('');
       $('.betslip__list li').find('.validation-msg').text('')
       stakeAmount = Number($(this).val());
       if (!stakeAmount) {
         return;
       }
       let odd = Number($(this).closest('li').data('option_odds'));
       $(this).closest('.betslip-right').find('.bet-return-amount').text(Math.abs(stakeAmount * odd).toFixed(2))
       if (event.type == 'focusout') {
         let data = {
           _token: '25rgF0nGExTWpD4HaYeQJCVM64TgZNmrcfqGcelF',
           id: $(this).closest('li').data('option_id'),
           amount: stakeAmount
         }
         $.ajax({
           type: "POST",
           url: `https://script.viserlab.com/betlab/bet/update`,
           data: data,
           success: function(response) {
             if (betType == singleBet) {
               var isInvestAmountSame = false;
               var firstInvestAmountValue = $('.investAmount').first().val();
               if (betSlipCount() > 1) {
                 $('.investAmount').each(function(index) {
                   var currentInvestAmountValue = $(this).val();
                   if (currentInvestAmountValue && currentInvestAmountValue == firstInvestAmountValue) {
                     isInvestAmountSame = true;
                   } else {
                     isInvestAmountSame = false;
                   }
                 });
               }
               if (isInvestAmountSame) {
                 $('[name=total_invest]').val(firstInvestAmountValue)
                 sessionStorage.setItem('total_stake_amount', firstInvestAmountValue);
               } else {
                 removeSessionTotalStakeAmount();
                 totalStakeInput();
               }
             } else {
               removeSessionTotalStakeAmount();
               totalStakeInput();
             }
             betReturnAmount();
           }
         });
       }
     });
     $(document).on('click', '.removeFromSlip', function() {
       removeBet($(this));
     });

     function removeBet(button) {
       $('.total-validation-msg').text('');
       $('.total-stake-amount').text('');
       $('.betslip__list li').find('.validation-msg').text('')
       let id = button.data('option_id');
       let data = {
         _token: '25rgF0nGExTWpD4HaYeQJCVM64TgZNmrcfqGcelF'
       };
       $.post(`https://script.viserlab.com/betlab/bet/remove/${id}`, data, function(response) {
         if (response.status == 'success') {
           $(document).find(`.oddBtn[data-option_id="${id}"]`).removeClass('active');
           $(document).find(`.removeFromSlip[data-option_id="${id}"]`).parent().remove();
           showTotalBetSlipCount(betSlipCount())
           betReturnAmount();
         }
       });
     }
     $('.betTypeBtn').on('click', function() {
       betType = Number($(this).data('type'));
       if ($(this).hasClass('active')) {
         return;
       }
       $('.total-validation-msg').text('');
       $('.total-stake-amount').text('');
       $('.betslip__list li').find('.validation-msg').text('')
       sessionStorage.setItem('type', betType);
       $(`.betTypeBtn`).removeClass('active');
       $(this).addClass('active');
       stakeAmount = sessionStorage.getItem('total_stake_amount');
       if (stakeAmount && betType == singleBet) {
         setStakeAmount(stakeAmount);
         let totalSingleStakeAmount = 0;
         $('.investAmount').each(function(index) {
           if (!$(this).val()) {
             $(this).closest('.betslip-right').find('.validation-msg').text(`Stake is required`);
           } else {
             totalSingleStakeAmount += Number($(this).val());
           }
         });
         if (totalSingleStakeAmount) {
           stakeLimitValidation(totalSingleStakeAmount)
         }
       } else {
         totalStakeInput(stakeAmount);
         if (stakeAmount) {
           stakeLimitValidation(stakeAmount);
         }
       }
       controlStakeInputFields();
       betReturnAmount();
     });
     $('.deleteAll').on('click', function() {
       let data = {
         _token: '25rgF0nGExTWpD4HaYeQJCVM64TgZNmrcfqGcelF'
       };
       $.post(`https://script.viserlab.com/betlab/bet/remove-all`, data, function(response) {
         if (response.status == 'success') {
           $('.betslip__list li').remove();
           $('.oddBtn').removeClass('active');
           showTotalBetSlipCount(betSlipCount());
           betReturnAmount();
         }
       });
     })
     $('[name=total_invest]').on('input focusout', function(event) {
       $('.total-validation-msg').text('');
       $('.total-stake-amount').text('');
       $('.betslip__list li').find('.validation-msg').text('');
       totalStakeAmount = Number($(this).val());
       if (!totalStakeAmount) {
         let hasValue = false;
         $('.investAmount').each(function(index) {
           if ($(this).val()) {
             hasValue = true;
           }
         });
         if (hasValue) {
           removeSessionTotalStakeAmount();
         }
         return;
       } else {
         sessionStorage.setItem('total_stake_amount', totalStakeAmount);
         setStakeAmount(Number($(this).val()));
         betReturnAmount();
       }
       if (event.type == 'focusout') {
         let data = {
           _token: '25rgF0nGExTWpD4HaYeQJCVM64TgZNmrcfqGcelF',
           amount: totalStakeAmount,
         }
         $.ajax({
           type: "POST",
           url: `https://script.viserlab.com/betlab/bet/update-all`,
           data: data,
           success: function(response) {
             $('.total-validation-msg').text('');
           }
         });
       }
     })
     $('.betPlaceBtn').on('click', function(e) {
       let error = false;
       let message = '';
       let totalBetCount = betSlipCount();
       let finalStakeAmount = 0;
       if (betType == multiBet && totalBetCount < 2) {
         notify('error', "Minimum of two bets are required for multi bet");
         return;
       }
       if (betType == multiBet) {
         finalStakeAmount = Number($('[name=total_invest]').val());
         if (!finalStakeAmount) {
           $('.total-validation-msg').text(`Stake amount is required`);
           return;
         }
       } else {
         if (!totalBetCount) {
           notify('error', "Your bet slip is empty");
           return;
         }
         finalStakeAmount = 0;
         $('.investAmount').each(function(index) {
           if (!$(this).val()) {
             $(this).closest('.betslip-right').find('.validation-msg').text(`Stake is required`);
             error = true;
           } else {
             finalStakeAmount += Number($(this).val());
           }
         });
         if (error) {
           return;
         }
       }
       let stakeLimit = stakeLimitValidation(finalStakeAmount);
       if (stakeLimit) {
         return;
       }
       stakeAmount = finalStakeAmount;
       if (auth) {
         var modal = $("#betModal");
         modal.find('[name=stake_amount]').val(finalStakeAmount);
         modal.find('[name=type]').val(betType);
       } else {
         var modal = $("#loginModal");
         var html = `
	<input type="hidden" name="location" value=${window.location.href}/>`;
         modal.find('.input--group').prepend(html);
       }
       modal.modal('show');
     });

     function stakeLimitValidation(finalAmount) {
       let minLimit = betType == singleBet ? Number("20") : Number("100");
       let maxLimit = betType == singleBet ? Number("1000") : Number("25000");
       if (finalAmount < minLimit) {
         $('.total-stake-amount').text(`Total stake $${finalAmount}`)
         $('.total-validation-msg').text(`Min stake limit $${minLimit}`);
         return true;
       }
       if (finalAmount > maxLimit) {
         $('.total-stake-amount').text(`Total stake $${finalAmount}`)
         $('.total-validation-msg').text(`Max stake limit $${maxLimit}`);
         return true;
       }
       return false;
     }
     $('#betForm').on('submit', function(e) {
       sessionStorage.removeItem('total_stake_amount');
       return true;
     });
   })(jQuery);
 </script>
 <link rel="stylesheet" href="https://script.viserlab.com/betlab/assets/global/css/iziToast.min.css">
 <script src="https://script.viserlab.com/betlab/assets/global/js/iziToast.min.js"></script>
 <script>
   "use strict";

   function notify(status, message) {
     if (typeof message == 'string') {
       iziToast[status]({
         message: message,
         position: "topRight"
       });
     } else {
       $.each(message, function(i, val) {
         iziToast[status]({
           message: val,
           position: "topRight"
         });
       });
     }
   }
 </script>
 <script>
   (function($) {
     "use strict";
     $(".langSel").on("change", function() {
       window.location.href = "https://script.viserlab.com/betlab/change/" + $(this).val();
     });
     $(".oddsType").on("change", function() {
       window.location.href = `https://script.viserlab.com/betlab/odds-type/${$(this).val()}`;
     });
     $('.policy').on('click', function() {
       $.get('https://script.viserlab.com/betlab/cookie/accept', function(response) {
         $('.cookies-card').addClass('d-none');
       });
     });
     setTimeout(function() {
       $('.cookies-card').removeClass('hide')
     }, 2000);
     $.each($('input, select, textarea'), function(i, element) {
       var elementType = $(element);
       if (elementType.attr('type') != 'checkbox') {
         if (element.hasAttribute('required')) {
           $(element).closest('.form-group').find('label').addClass('required');
         }
       }
     });
     Array.from(document.querySelectorAll('table')).forEach(table => {
       let heading = table.querySelectorAll('thead tr th');
       Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
         Array.from(row.querySelectorAll('td')).forEach((column, i) => {
           (column.colSpan == 100) || column.setAttribute('data-label', heading[i].innerText)
         });
       });
     });
   })(jQuery);
 </script>
 <script>
   var Tawk_API = Tawk_API || {},
     Tawk_LoadStart = new Date();
   (function() {
     var s1 = document.createElement("script"),
       s0 = document.getElementsByTagName("script")[0];
     s1.async = true;
     s1.src = 'https://embed.tawk.to/5fe0b9b2a8a254155ab5421d/1eq2tap1m';
     s1.charset = 'UTF-8';
     s1.setAttribute('crossorigin', '*');
     s0.parentNode.insertBefore(s1, s0);
   })();
 </script>
 <script>
   if (window.top != window.self) {
     document.body.innerHTML += ' < div style = "position:fixed;top:0;width:100%;z-index:9999999;background:#f8d7da;color:#721c24;text-align:center; padding: 20px;" > < p style = "font-size:20px; font-weight: bold;" > You are using this website under an external iframe!! < /p> < p style = "font-size:16px; margin-top: 20px;" >
       for a better experience, please browse directly instead of an external iframe. < /p> < a href = "'+window.self.location+'"
     target = "_blank"
     style = " margin-top:20px; color: #fff;background-color: #dc3545; padding: 5px 10px; border-radius: 5px; text-decoration: none;" > Browse Directly < /a> < /div>';
   }
 </script>
 <script>
   adroll_adv_id = "YXRNNTO7ZBAMFBH67UUE5M";
   adroll_pix_id = "MMQQDWGN25EXPHGRPA3NLR";
   adroll_version = "2.0";
   (function(w, d, e, o, a) {
     w.__adroll_loaded = true;
     w.adroll = w.adroll || [];
     w.adroll.f = ['setProperties', 'identify', 'track'];
     var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js";
     for (a = 0; a < w.adroll.f.length; a++) {
       w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
         return function() {
           w.adroll.push([n, arguments])
         }
       })(w.adroll.f[a])
     }
     e = d.createElement('script');
     o = d.getElementsByTagName('script')[0];
     e.async = 1;
     e.src = roundtripUrl;
     o.parentNode.insertBefore(e, o);
   })(window, document);
   adroll.track("pageView");
 </script>
 <!-- Google tag (gtag.js) -->
 <script async src="https://www.googletagmanager.com/gtag/js?id=G-1ME4K0RD7K"></script>
 <script>
   window.dataLayer = window.dataLayer || [];

   function gtag() {
     dataLayer.push(arguments);
   }
   gtag('js', new Date());
   gtag('config', 'G-1ME4K0RD7K');
 </script>