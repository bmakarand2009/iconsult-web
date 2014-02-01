// JavaScript Document
function admin(links){
    if (links == 1) {
        document.getElementById('text').style.display = 'none';
        document.getElementById('newselect').style.display = 'block';
        document.getElementById('click').style.display = 'none';	
        document.getElementById('click1').style.display = 'block';		
    }
	if (links == 2) {
		document.getElementById('text').style.display = 'block';
        document.getElementById('newselect').style.display = 'none';
        document.getElementById('click').style.display = 'block';
		document.getElementById('click1').style.display = 'none';
		}
}

// for the suplier view page
function edittags(links){
    if (links == 1) {
        document.getElementById('addtags').style.display = 'block';	
    }
	if (links == 2) {
		document.getElementById('addtags').style.display = 'none';
		}
}