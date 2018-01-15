var dev_count=0;
function developer(){
	if(dev_count%2==0)
		$('.developer-ttarget').tapTarget('open');
	else
		$('.developer-ttarget').tapTarget('close');
	dev_count++;
}