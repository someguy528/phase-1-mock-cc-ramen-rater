// write your code here
let ramenForm = document.getElementById('new-ramen');
let ramenImgs = document.getElementById('ramen-menu');
let currentRating = document.getElementsByTagName('p')[0];
let currentComment = document.getElementsByTagName('p')[1];
fetch('http://localhost:3000/ramens')
.then(resp=>resp.json())
.then(data=> {
    ramenData=data;
    data.forEach(makeImg);
    foodDisplay(ramenData[0]);
    return ramenData;
})
.catch(e=>alert(`Something went wrong: ${e}`));
function makeImg(obj){
    let newImg = document.createElement('img');
    newImg.src = `${obj.image}`;
    newImg.id = `${obj.id}`;
    ramenImgs.append(newImg);
    newImg.addEventListener('click', e=>{
        let targetRamen = ramenData.filter(ramen => parseInt(ramen.id) === parseInt(e.target.id))[0];
        foodDisplay(targetRamen);
    })
}
function foodDisplay(ramen){
    currentRamen = ramen;
    console.log(currentRamen);
    let ramenDetail = document.getElementById('ramen-detail');
    let img = ramenDetail.querySelector(`img`);
    let ramenName = ramenDetail.querySelector('h2');
    let ramenRestaurant = ramenDetail.querySelector(`h3`);
    img.src = `${currentRamen.image}`;
    ramenName.textContent = `${currentRamen.name}`;
    ramenRestaurant.textContent = `${currentRamen.restaurant}`;
    currentRating.textContent = `${currentRamen.rating}`;
    currentComment.textContent = `${currentRamen.comment}`;
}
function ramenFormSubmit(e){
    e.preventDefault();
    console.log(e.target);
    let newRamenObj = {};
    newRamenObj.id = ramenData.length + 1;
    newRamenObj.name = e.target['new-name'].value;
    newRamenObj.restaurant = e.target['new-restaurant'].value;
    newRamenObj.image = e.target['new-image'].value;
    newRamenObj.rating = e.target['new-rating'].value;
    newRamenObj.comment = e.target['new-comment'].value;
    ramenData.push(newRamenObj);
    makeImg(newRamenObj);
}
ramenForm.addEventListener('submit', e => ramenFormSubmit(e));