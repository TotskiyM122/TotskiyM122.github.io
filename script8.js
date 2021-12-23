function formaShow() {
    $(".window-wrapper").show();
    window.history.pushState({ "isActive": true }, "", "#form");
    $(".wrapper").addClass("modal-opened");
    $(".background").addClass("blur");
}

function formaHide() {
    $(".window-wrapper").hide();
    window.history.pushState({ "isActive": false }, "", "html8.html");
    $(".wrapper").removeClass("modal-opened");
    $(".background").removeClass("blur");
}

$(document).ready(function () {

    $(document).mouseup(function (e) {
        if (!$(".window-wrapper").is(e.target) && $(".window-wrapper").has(e.target).length === 0) {
            formHide();
        }
    });

    $("#check").change(function () {
        if ($("#check").is(":checked")) {
            $("#submitButton").prop("disabled", false);
        } else {
            $("#submitButton").prop("disabled", true);
        }
    });

    let data = document.querySelectorAll(".information");
    data.forEach(function (element) {
        element.value = localStorage.getItem(element.name);
        element.addEventListener("blur", function (event) {
            localStorage.setItem(event.target.name, event.target.value);
        });
    });

    window.addEventListener("popstate", function (event) {
        if (event.state.isActive) {
            formaShow();
        } else {
            formaHide();
        }
    });

    const ajaxSend = (formaData) => {
        fetch("https://formcarry.com/s/RbmO9k4vDkz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(function (response) {
                alert("Сообщение отправлено");
                data.forEach((element) => { element.value = ""; });
                $("#check").prop("checked", false);
                $("#submitButton").prop("disabled", true);
                localStorage.clear();
            })
            .catch((error) => {alert(error);})
    };

    const forms = $("#thatForm");
    for (let j = 0; j < forms.length; j++) {
        forms[j].addEventListener("submit", function (e) {

            e.preventDefault();

            let formaData = new FormaData(this);
            formaData = Object.fromEntries(formaData);

            ajaxSend(formaData);
        });
    };

});