const SideBar = document.querySelector('.SideBar');


// Scrolling Functions:

// press left button to scroll to right:
function scroll_l(x) {
    var ListToMove = document.getElementById(x);
    ListToMove.scrollBy(744, 0);
}
// press right button to scroll to letf:
function scroll_r(x) {
    var ListToMove = document.getElementById(x);
    ListToMove.scrollBy(-744, 0);
}



// Show/Hide SideBar Function
function ToggleShowSideBar() {
    if (SideBar.style.display === 'flex') {
        SideBar.style.display = 'none'
    } else {
        SideBar.style.display = 'flex'
    }
}