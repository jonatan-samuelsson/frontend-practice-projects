const shareBtn = document.getElementById("share-btn");
const shareToast = document.getElementById("share-toast");

shareBtn.addEventListener("click", function(e) {
    e.preventDefault();
    shareBtn.classList.toggle('active');
    shareToast.classList.toggle('hidden');

})