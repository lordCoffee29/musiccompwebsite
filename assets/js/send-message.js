function sendMail() {
    var link = "mailto:anika.saiprabhu@gmail.com"
             + "?cc=CCaddress@example.com"
             + "&subject=" + escape("This is my subject")
             + "&body=" + escape(document.getElementById('message').value)
    ;

    window.location.href = link;
}