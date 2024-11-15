$(document).ready(function () {
    if ($(window).width() >= 576) {
        if ($('.filter-item.network').length){
            $('.filter-item.network .filter-bottom-list .group-checkbox').slice(10).hide();

            // Xử lý sự kiện click của nút "Show more"
            $('.show-more-filter').css('cursor', 'pointer');
            $('.show-more-filter').click(function() {
                // Hiển thị tất cả các checkbox còn lại
                $('.filter-bottom-list .group-checkbox').slice(10).slideDown();
                
                // Ẩn nút sau khi đã hiển thị các checkbox
                $(this).hide();
            });
        }
    }
    $('.keyword-text').click(function() {
        $(this).toggleClass('open')
    })


    $(document).on('click touchstart', (e) => {
        if (!$(e.target).closest($('.keyword-text')).length) {
            $('.keyword-text').removeClass('open');
        }
    });

    // hero

    let resultCheckbox = [
    ];

    function updateChecked() {
        $('.filter-item.location .check').each(function() {
            const checkboxId = $(this).attr('id');
            const isChecked = resultCheckbox.some(item => item.id === checkboxId);
            $(this).prop('checked', isChecked);
        });
    }

    $('.filter-item.location .group-checkbox').click(function() {
        updateChecked()
    })


    $('.dropdown.dropdown-location').each((i, element) => {

        const $el = $(element);
        const $label = $el.find('.dropdown-label');
        const $inputs = $el.find('.check');

        // Function to update the dropdown label
        function updateLabel() {
            checkResult()
            updateChecked()

            $label.empty(); // Clear current label content
            if (resultCheckbox.length) {
                resultCheckbox.forEach(item => {
                    const $labelItem = $('<span class="selected-item"></span>').text(item.text);
                    const $removeButton = $('<div class="remove-item"></div>').html(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                          <path d="M6 6L15 15" stroke="#636A80" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15 6L6 15" stroke="#636A80" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      `)
                    // Add the remove button to the label
                    $labelItem.append($removeButton);
                    $label.append($labelItem);

                    // Handle the click event on the remove button
                    $removeButton.on('click', function (e) {
                        e.stopPropagation();
                        // Remove the item from the result
                        resultCheckbox = resultCheckbox.filter(r => r.text !== item.text);
                        // Uncheck the corresponding checkbox
                        $inputs.filter(`[id="${item.id}"]`).prop('checked', false);
                        updateLabel(); // Re-render the label
                    });
                });
            } else {
                $label.html('<span>Preferred Location</span>');
            }
        }

        function checkResult() {
            if (resultCheckbox.length > 0) {
                $('.logo-dropdown').addClass('d-none')
                $('.logo-close').addClass('d-block')
                $('.logo-dropdown').removeClass('d-block')
                $('.logo-close').removeClass('d-none')
            } else {
                $('.logo-dropdown').addClass('d-block')
                $('.logo-close').addClass('d-none')
                $('.logo-dropdown').removeClass('d-none')
                $('.logo-close').removeClass('d-block')
            }
        }

        // Initialize default checked values
        $el.find('input[type=checkbox]:checked').each(function () {
            const checkedText = $(this).next().text();
            const id = $(this).attr('id');
            const value = $(this).attr('value');
            resultCheckbox.push({ text: checkedText, id: id, value: value });
        });

        // Initialize default checked values
        $inputs.each(function () {
            const checkboxId = $(this).attr('id');
            const isChecked = resultCheckbox.some(item => item.id === checkboxId); // Check if checkbox should be checked
            $(this).prop('checked', isChecked); // Update the checkbox status
        });

        updateLabel();

        // Toggle dropdown visibility
        $label.on('click', () => $el.toggleClass('open'));

        // Handle checkbox change events
        $inputs.on('change', function () {
            const $this = $(this);
            const checkedText = $this.next().text();
            const id = $this.attr('id');
            const value = $(this).attr('value');

            if ($this.is(':checked')) {
                resultCheckbox.push({ text: checkedText, id: id, value: value });
            } else {
                resultCheckbox = resultCheckbox.filter(item => item.id !== id);
            }
            updateLabel();
        });

        // Close dropdown if clicked outside
        $(document).on('click touchstart', (e) => {
            if (!$(e.target).closest($el).length) {
                $el.removeClass('open');
            }
        });

        // Empty result
        $('.logo-close').on('click', () => {
            resultCheckbox = []

            // Remove 'selected-item' from the dropdown label
            $('.dropdown-label').empty().html('<span>Preferred Location</span>');

            checkResult()

            // Uncheck all checkboxes in the dropdown
            $('.check').prop('checked', false);
        });
    });

    let resultCheckboxNetwork = [
    ];

    $('.dropdown.dropdown-network').each((i, element) => {

        const $el = $(element);
        const $label = $el.find('.dropdown-label');
        const $inputs = $el.find('.check');

        // Function to update the dropdown label
        function updateLabel() {

            checkResult()
            toggleDropdownClass()

            $label.empty(); // Clear current label content
            if (resultCheckboxNetwork.length) {
                resultCheckboxNetwork.forEach(item => {
                    const $labelItem = $('<span class="selected-item"></span>').text(item.text);
                    const $removeButton = $('<div class="remove-item"></div>').html(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                          <path d="M6 6L15 15" stroke="#636A80" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15 6L6 15" stroke="#636A80" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      `)
                    // Add the remove button to the label
                    $labelItem.append($removeButton);
                    $label.append($labelItem);

                    // Handle the click event on the remove button
                    $removeButton.on('click', function (e) {
                        e.stopPropagation(); 
                        // Remove the item from the result
                        resultCheckboxNetwork = resultCheckboxNetwork.filter(r => r.text !== item.text);
                        // Uncheck the corresponding checkbox
                        $inputs.filter(`[id="${item.id}"]`).prop('checked', false);
                        updateLabel(); // Re-render the label
                        toggleDropdownClass()
                    });
                });
            } else {
                $label.html('<span>Preferred Location</span>');
            }
        }

        function checkResult() {
            if (resultCheckboxNetwork.length > 0) {
                $('.logo-dropdown').addClass('d-none')
                $('.logo-close').addClass('d-block')
                $('.logo-dropdown').removeClass('d-block')
                $('.logo-close').removeClass('d-none')
            } else {
                $('.logo-dropdown').addClass('d-block')
                $('.logo-close').addClass('d-none')
                $('.logo-dropdown').removeClass('d-none')
                $('.logo-close').removeClass('d-block')
            }
        }

        // Initialize default checked values
        $el.find('input[type=checkbox]:checked').each(function () {
            const checkedText = $(this).next().text();
            const id = $(this).attr('id');
            const value = $(this).attr('value');
            resultCheckboxNetwork.push({ text: checkedText, id: id, value: value });
        });

        // Initialize default checked values
        $inputs.each(function() {
            const checkboxId = $(this).attr('id');
            const isChecked = resultCheckboxNetwork.some(item => item.id === checkboxId); // Check if checkbox should be checked
            $(this).prop('checked', isChecked); // Update the checkbox status
        });

        updateLabel();

        // Toggle dropdown visibility
        $label.on('click', () => $el.toggleClass('open'));

        // Handle checkbox change events
        $inputs.on('change', function () {
            const $this = $(this);
            const checkedText = $this.next().text();
            const id = $this.attr('id');
            const value = $(this).attr('value');

            if ($this.is(':checked')) {
                resultCheckboxNetwork.push({ text: checkedText, id: id, value: value });
            } else {
                resultCheckboxNetwork = resultCheckboxNetwork.filter(item => item.id !== id);
            }
            updateLabel();
        });

        // Close dropdown if clicked outside
        $(document).on('click touchstart', (e) => {
            if (!$(e.target).closest($el).length) {
                $el.removeClass('open');
            }
        });

        // Empty result
        $('.logo-close').on('click', () => {
            resultCheckboxNetwork = []

            // Remove 'selected-item' from the dropdown label
            $('.dropdown-label').empty().html('<span>Preferred Location</span>');

            checkResult()
            toggleDropdownClass()

            // Uncheck all checkboxes in the dropdown
            $('.check').prop('checked', false);
        });

        $('.dropdown.dropdown-network.default').click(function () {
            updateLabel()

            $inputs.each(function () {
                const $this = $(this);
                const checkboxId = $this.attr('id');
                const isChecked = resultCheckboxNetwork.some(item => item.id === checkboxId);
                $this.prop('checked', isChecked); // Update the checkbox status
            });
        })

        function toggleDropdownClass() {
            // Get the dropdown element
            const $dropdown = $('.dropdown.dropdown-network.default');
            
            // Get the selected item element
            const $selectedItem = $('.dropdown.dropdown-network.default .selected-item');

            console.log($selectedItem.length)
          
            // Check if the selected item is empty or contains only whitespace
            if ($selectedItem.length === 0 || $selectedItem.text().trim() === '') {
              // Add the 'none' class if the selected item is empty
              $dropdown.addClass('none');
            } else {
              // Remove the 'none' class if the selected item is not empty
              $dropdown.removeClass('none');
            }
        }

        $('.component-dropdown-newtwork .back').click(function () {
            updateLabel()
        })
    });

    // career

    $('.filter-item-top').click(function () {

        var $itemBottom = $(this).next('.filter-item-bottom');
        var $icon = $(this).find('.filter-icon-up');


        // Slide up any open itemBottoms
        // $('.filter-item-bottom').not($itemBottom).slideUp().css('opacity', 0);

        // Slide toggle the clicked itemBottom
        if ($itemBottom.is(':visible')) {
            $itemBottom.stop(true, true).slideUp().css('opacity', 0);
            $icon.addClass('rotate');
        } else {
            $itemBottom.stop(true, true).slideDown().css('opacity', 1);
            $icon.removeClass('rotate');
        }
    });

    // popup

    $('.btn-popup').click(function () {
        $('.popup-blur').addClass('active')
        $('.popup-form').addClass('active')
    });

    $('.popup-form .close').click(function () {
        $('.popup-blur').removeClass('active')
        $('.popup-form').removeClass('active')
    })

    $('.popup-thank .close').click(function () {
        $('.popup-blur').removeClass('active')
        $('.popup-thank').removeClass('active')
    })

    $('.popup-blur').click(function () {
        $(this).removeClass('active')
        $('.popup-thank').removeClass('active')
        $('.popup-form').removeClass('active')
    })

    $('#upload-file').on('change', function () {
        var file = this.files[0];
        if (file) {
            $('.upload-label .top').text(file.name);
            $('.upload-label .bot').text((file.size / (1024 * 1024)).toFixed(2) + ' MB');

            // Change icon after file upload
            $('.upload-label .icon .pending').toggle()
            $('.upload-label .icon .success').toggle()
        }
    });

    // filter mb

    $(window).on('scroll', function () {

        if ($('.career-result').length) {
            var careerResultTop = $('.career-result').offset().top;
            var scrollTop = $(window).scrollTop();
    
            if (scrollTop >= careerResultTop) {
                $('.filter-sticky').addClass('active'); // Hiển thị khi phần tử .career-result bị che bởi top của cửa sổ
            } else {
                $('.filter-sticky').removeClass('active'); // Ẩn khi phần tử .career-result không bị che
            }
        }
    });

    $('.icon-filter').click(function () {
        $('.career-filter').addClass('active')
    })

    $('.career-filter .close').click(function () {
        $('.career-filter').removeClass('active')
    })

    $('.career-filter .apply').click(function () {
        $('.career-filter').removeClass('active')
    })

    $('.component-dropdown-newtwork .back').click(function () {
        $('.component-dropdown-newtwork').removeClass('active')
    })

    $('.dropdown.dropdown-network.default').click(function () {

        $('.component-dropdown-newtwork').addClass('active')
    })

    // $('.submit-form').click(function(e) {
    //     e.preventDefault()
    //     $('.popup-form ').removeClass('active')
    //     $('.popup-thank').addClass('active')
    // })


    // Function to remove active class from all pages
    function removeActiveClass() {
        $('.pagi-page').removeClass('active');
    }

    // Add click event to each page
    $('.pagi-page').each(function() {
        $(this).on('click', function() {
            removeActiveClass();
            $(this).addClass('active');
        });
    });

    // Add event listener for prev button
    $('.pagi-prev').on('click', function() {
        const $activePage = $('.pagi-page.active');
        if ($activePage.length) {
            const $prevPage = $activePage.prev('.pagi-page');
            if ($prevPage.length) {
                removeActiveClass();
                $prevPage.addClass('active');
            }
        }
    });

    // Add event listener for next button
    $('.pagi-next').on('click', function() {
        const $activePage = $('.pagi-page.active');
        if ($activePage.length) {
            const $nextPage = $activePage.next('.pagi-page');
            if ($nextPage.length) {
                removeActiveClass();
                $nextPage.addClass('active');
            }
        }
    });

    // button detail

    var $button = $('.detail-content .detail-button');
    var $section = $('.detail')

    if ($section.length && $button.length) {
        var sectionTop = $section.offset().top;
        var buttonDefaultTop = $button.offset().top;
        var buttonHeight = $button.outerHeight();
        var windowHeight = $(window).height();
    
        $(window).scroll(function() {
          var scrollPos = $(window).scrollTop();
          var bottomScreenPos = scrollPos + windowHeight;
          
          // Kiểm tra nếu scroll đến hoặc vượt qua section và bottom của màn hình chưa đến vị trí ban đầu của button
          if (scrollPos >= sectionTop && bottomScreenPos < buttonDefaultTop + buttonHeight) {
            $button.addClass('sticky');
          } else {
            $button.removeClass('sticky');
          }
        });
    }


    // Chọn tất cả các modal có class 'modal' (hoặc các class khác nếu cần)
    const modals = document.querySelectorAll('.popup-blur, .career-filter');

    // Kiểm tra nếu có modal và lặp qua chúng
    modals.forEach(modal => {
        // Tạo một MutationObserver cho mỗi modal
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('active')) {
                        openModal(modal);
                    } else {
                        closeModal();
                    }
                }
            });
        });

        // Bắt đầu theo dõi sự thay đổi của các thuộc tính class
        observer.observe(modal, {
            attributes: true, // Theo dõi sự thay đổi thuộc tính
            attributeFilter: ['class'] // Chỉ theo dõi thuộc tính `class`
        });
    });

    // Hàm để xử lý khi modal mở
    function openModal(modal) {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
    }

    // Hàm để phục hồi lại scroll khi modal đóng
    function closeModal() {
        const scrollY = parseInt(document.body.style.top || '0', 10) * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
    }

});
