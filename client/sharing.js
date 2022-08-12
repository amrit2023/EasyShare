
const dropZone=document.querySelector(".drop-zone")
const fileinput=document.querySelector("#input")
const btn=document.querySelector(".btn")
const baseURL="http://localhost:3000"
const uploadURL=`${baseURL}/api/files`;
const emailURL=`${baseURL}api/files/send`;
const sharingcontainer=document.querySelector(".sharing-container");
const fileURL=document.querySelector("#fileURL")
const copybtn=document.querySelector("#copyURLBtn")
const emailForm=document.querySelector("#emailForm")
dropZone.addEventListener("dragover",(e)=>{
//console.log("dragging")
e.preventDefault()
if (!dropZone.classList.contains("dragged")){
dropZone.classList.add("dragged");
}
});

dropZone.addEventListener("dragleave",(e)=>{
	dropZone.classList.remove("dragged")
})

dropZone.addEventListener("drop",(e)=>{
     e.preventDefault()
	dropZone.classList.remove("dragged");
	const files=e.dataTransfer.files;
	console.table(files);
	if(files.length){
	fileinput.files=files;}
	uploadfile()
}) 

fileinput.addEventListener("change",()=>{
	uploadfile()
})

btn.addEventListener("click",(e)=>{
fileinput.click()
}) 

copybtn.addEventListener("click",()=>{
 fileURL.select()
 document.execCommand("copy")
})


emailForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  const url=fileURL.value;

  const formData={
  	uuid: url.split("/").splice(-1, 1)[0],
    emailTo: emailForm.elements["to-email"].value,
    emailFrom: emailForm.elements["from-email"].value,
  };
  
  emailForm[2].setAttribute("disabled","true");
  console.table(formData);
  fetch(emailURL,{
  	method: "POST",
  	headers: {
  		"Content-Type":"application/json"
  	},
  	body:JSON.stringify(formData),
  })
  .then((res)=> res.json())
  .then((success)=>{
  	console.log(data);
  	if(success){
  		sharingcontainer.style.display="none";
  	}
  })
});


const uploadfile = ()=>{
	const file=fileinput.files[0];
	const formData=new FormData()
	formData.append("myfile",file)
	const xhr=new XMLHttpRequest();
	xhr.onreadystatechange=()=>{
	 if(xhr.readyState===XMLHttpRequest.DONE){
	 	console.log(xhr.response)
	 	showLink(JSON.parse(xhr.response));
	 }
	};
	xhr.open("POST",uploadURL);
	xhr.send(formData)
};


const showLink=({file: url})=>{
	console.log(url)
	fileinput.value="";
	emailForm[2].removeAttribute("disabled");
	sharingcontainer.style.display="block"
	fileURL.value= url;
};