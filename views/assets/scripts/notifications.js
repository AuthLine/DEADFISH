    // ---------------------------------------------------------
    //   Show Toast Message
    // ---------------------------------------------------------

    $("#info").jqxNotification({ width: 300, appendContainer: "#epibot-notifications", opacity: 0.9, autoClose: true, autoCloseDelay: 5000, template: "info" });
    $("#warning").jqxNotification({ width: 300, appendContainer: "#epibot-notifications", opacity: 0.9, autoClose: true, autoCloseDelay: 5000, template: "warning" });
    $("#success").jqxNotification({ width: 300, appendContainer: "#epibot-notifications", opacity: 0.9, autoClose: true, autoCloseDelay: 5000, template: "success" });
    $("#error").jqxNotification({ width: 300, appendContainer: "#epibot-notifications", opacity: 0.9, autoClose: true, autoCloseDelay: 5000, template: "error" });

    function createNotification(type, message) {
        var icons = {
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle',
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
        }
        var id = "#" + type.toLowerCase()
        $(id).html('<div><span class="fa ' + icons[type] + '"></span> ' + message + '</div>');
        $(id).jqxNotification("open");

    }

    // Show success toast message
    var showSuccess = function(message, time=2000) {
        createNotification('success', message);
    }

    // Show notice toast message
    var showNotice = function(message, time=2000) {
        createNotification('info', message);
    }

    // Show warning toast message
    var showWarning = function(message, time=2000) {
        createNotification('warning', message);
    }

    // Show error toast message
    var showError = function(message, time=2000) {
        createNotification('error', message);
    }
