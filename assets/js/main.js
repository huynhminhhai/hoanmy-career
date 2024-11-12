$(document).ready(function () {

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
        {
            "text": "Ho Chi Minh",
            "id": "checkbox-custom_01",
            "value": "1"
        }
    ];

    $('.dropdown.dropdown-location').each((i, element) => {

        const $el = $(element);
        const $label = $el.find('.dropdown-label');
        const $inputs = $el.find('.check');

        // Function to update the dropdown label
        function updateLabel() {
            checkResult()

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
        {
            "text": "Hoan My Sai Gon Hospital",
            "id": "checkbox-network-1",
            "value": "Hoan My Sai Gon Hospital"
        }
    ];

    $('.dropdown.dropdown-network').each((i, element) => {

        const $el = $(element);
        const $label = $el.find('.dropdown-label');
        const $inputs = $el.find('.check');

        // Function to update the dropdown label
        function updateLabel() {

            checkResult()

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
        var careerResultTop = $('.career-result').offset().top;
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= careerResultTop) {
            $('.filter-sticky').addClass('active'); // Hiển thị khi phần tử .career-result bị che bởi top của cửa sổ
        } else {
            $('.filter-sticky').removeClass('active'); // Ẩn khi phần tử .career-result không bị che
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

});
