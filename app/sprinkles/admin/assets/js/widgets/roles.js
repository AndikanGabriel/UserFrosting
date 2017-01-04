/**
 * Roles widget.  Sets up dropdowns, modals, etc for a table of roles.
 */
 
// TODO: move these to a common JS file for form widgets
$.fn.select2.defaults.set( "theme", "bootstrap" );

/**
 * Set up the form in a modal after being successfully attached to the body.
 */
function attachRoleForm() {
    $("body").on('renderSuccess.ufModal', function (data) {
        // TODO: set up any widgets inside the modal
        $(".js-form-role").find("select[name='group_id']").select2();
        
        // Set up the form for submission
        $(".js-form-role").ufForm({
            validators: page.validators,
            msgTarget: $(".js-form-role-alerts")
        }).on("submitSuccess.ufForm", function() {
            // Reload page on success
            window.location.reload();
        });
    });
}

var initRoleTable = function () {
    // Link create button
    $(this).find('.js-role-create').click(function() {
        $("body").ufModal({
            sourceUrl: site.uri.public + "/modals/roles/create",
            msgTarget: $("#alerts-page")
        });

        attachRoleForm();
    });

    /**
     * Link row buttons after table is loaded.
     */

    /**
     * Buttons that launch a modal dialog
     */
    // Edit role details button
    $(this).find('.js-role-edit').click(function() {
        $("body").ufModal({
            sourceUrl: site.uri.public + "/modals/roles/edit",
            ajaxParams: {
                slug: $(this).data('slug')
            },
            msgTarget: $("#alerts-page")
        });

        attachRoleForm();
    });

    // Delete group button
    $(this).find('.js-role-delete').click(function() {
        $("body").ufModal({
            sourceUrl: site.uri.public + "/modals/roles/confirm-delete",
            ajaxParams: {
                slug: $(this).data('slug')
            },
            msgTarget: $("#alerts-page")
        });

        $("body").on('renderSuccess.ufModal', function (data) {
            var modal = $(this).ufModal('getModal');

            modal.find('.js-form-role-delete').ufForm({
                msgTarget: $(".js-form-role-alerts")
            }).on("submitSuccess.ufForm", function() {
                // Reload page on success
                window.location.reload();
            });
        });
    });
};