$(document).on("click", ".js-toggle-modal", function(e) {
    e.preventDefault();
    $(".js-modal").toggleClass("hidden")
})
.on("click", ".js-submit", function(e) {
    e.preventDefault();
    const $btn = $(this);
    const text = $(".js-post-text").val().trim()

    if(!text.length) {
        return false
    }

   /* $(".js-modal").addClass("hidden")
    $(".js-post-text").val("")  */


    $btn.prop("disabled", true).text("Posting!")
    $.ajax({
        type: "POST",
        url: $(".js-post-text").data("post-url"),  // $textarea.data("post-url"),
        data: {
            text: text  // $textarea.val()
        },
        success: (dataHtml) => {
            $(".js-modal").addClass("hidden");
            $("#post-container").prepend(dataHtml);
            $btn.prop("disabled", false).text("New Post");
            $(".js-post-text").val('')   // $textarea.val("");
        },
        error: (error) => {
            console.warn(error)
            $btn.prop("disabled", false).text("Error");
        }
    });
})