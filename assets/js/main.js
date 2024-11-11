$(document).ready(function () {

    // hero

    let resultCheckbox = [
        {
            "text": "Ho Chi Minh",
            "id": "checkbox-custom_01",
            "value": "1"
        }
    ];

    $('.dropdown').each((i, element) => {
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
        $inputs.each(function() {
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
            $('.dropdown-label').empty().text('Select Options');

            // Uncheck all checkboxes in the dropdown
            $('.check').prop('checked', false);
        });
    });

    // career

    $('.filter-item-top').click(function() {

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

    $('.btn-popup').click(function(){
        $('.popup-blur').addClass('active')
        $('.popup-form').addClass('active')
    });

    $('.popup-form .close').click(function() {
        $('.popup-blur').removeClass('active')
        $('.popup-form').removeClass('active')
    })

    $('.popup-thank .close').click(function() {
        $('.popup-blur').removeClass('active')
        $('.popup-thank').removeClass('active')
    })

    $('.popup-blur').click(function() {
        $(this).removeClass('active')
        $('.popup-thank').removeClass('active')
        $('.popup-form').removeClass('active')
    })

    $('#upload-file').on('change', function() {
        var file = this.files[0];
        if (file) {
            $('.upload-label .top').text(file.name);
            $('.upload-label .bot').text('Size: ' + (file.size / 1024).toFixed(2) + ' KB');
            
            // Change icon after file upload
            $('.upload-label .icon').html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M37.5015 42H10.5C10.1022 42 9.72064 41.842 9.43934 41.5607C9.15803 41.2794 9 40.8978 9 40.5V7.5C9 7.10218 9.15803 6.72064 9.43934 6.43934C9.72064 6.15804 10.1022 6 10.5 6H28.5015L39.0015 16.5V40.5C39.0015 40.697 38.9627 40.892 38.8873 41.074C38.8119 41.256 38.7014 41.4214 38.5621 41.5607C38.4228 41.7 38.2575 41.8104 38.0755 41.8858C37.8935 41.9612 37.6984 42 37.5015 42Z" stroke="#009BAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28.5 6V16.5H39.0015" stroke="#009BAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 25.5H30" stroke="#009BAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 31.5H30" stroke="#009BAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `);
        }
    });
});
