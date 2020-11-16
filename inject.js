// Security Policy say no
/* ---- */
window.add_url = function (e) {
    var dom = document.createElement("link");
    dom.rel = "stylesheet";
    dom.href = "http://127.0.0.1:8000/?add=" + e;

    document.body.appendChild(dom);
};

window.add_url = async function (e) {
    var url = "http://127.0.0.1:8000/?add=" + e;
    var tabs = window.open(url, "");

    var timer = setInterval(function() {
        if (tabs.closed)
        {
            clearInterval(timer);
        }

        if (tabs.document.readyState == "complete")
        {
            tabs.close();
        }
    }, 500);

    return true;
};

document.onclick = function (e) {
    e = e || window.event;
    var element = e.target || e.srcElement;

    if (element.tagName == 'A') {
        window.add_url(element.href);
        return false;
    }
};


/* else */

window.add_url = function (e) {
    var url = "http://127.0.0.1:8000/?add=" + e;
    return url;
};

var url_links = document.getElementsByTagName("a");

for (var link_index = 0; link_index < url_links.length; link_index++)
{
    var this_link = url_links[link_index];

    this_link.href = window.add_url(this_link.href);
}
