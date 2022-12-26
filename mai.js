let e = document.querySelector('#v1');
e.onclick = function() {
        let full = document.querySelector('#full');
      setTimeout(function(){
        full.style.display = 'block';
        },1000)
}
let cy = document.querySelector('#cyd');
cy.onclick = function(){
  setTimeout(function(){
        full.style.display = 'none';
        },2000)
}
