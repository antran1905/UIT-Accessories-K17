function search(e) {
    if (e.keyCode == 13) {
        let text = e.target.value;
        if (!text)
            return;
        text = text.trim();
        var keyword = {
            name: text
        }
        localStorage.setItem('searchKey', text);
        e.target.value = '';
        location.assign('./search.html');
    }
}