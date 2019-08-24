<template>
    <div class="detail-nav">
        <div class="content-box">
            <h3 class="content-title">房間人數:</h3>
            <h2 class="content">{{itemList.descriptionShort.GuestMin}}~{{itemList.descriptionShort.GuestMax}}人</h2>
        </div>
        <div class="content-box">
            <h3 class="content-title">床型:</h3>
            <h2 class="content">{{itemList.descriptionShort.Bed.join()}}</h2>
        </div>
        <div class="content-box">
            <h3 class="content-title">房間大小:</h3> 
            <h2 class="content">{{itemList.descriptionShort.Footage}} 平方公尺</h2>
        </div>
        <div class="content-box">
            <h3 class="content-title">衛浴數量</h3>
            <h2 class="content">{{itemList.descriptionShort["Private-Bath"]}}</h2>
        </div>
        <div class="content-box">
            <h3 class="content-title">CheckIn時間</h3>
            <h2 class="content">{{itemList.checkInAndOut.checkInEarly}}~{{itemList.checkInAndOut.checkInLate}}</h2>
        </div>
        <div class="content-box">
            <h3 class="content-title">CheckOut時間</h3>
            <h2 class="content">{{itemList.checkInAndOut.checkOut}}</h2>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        itemList:Object
    }
}
</script>

<style lang="scss" scoped>
.detail-nav{
    width: calc(100% - 54px);
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border: 2px solid #E0E0E0;
    border-radius: 5px;
    padding: 25px;
    margin-bottom: 40px;
}
.content-box{
    min-width: 90px;
    height: 80px;
    //padding: 0 2%;
}
.content-box:nth-child(4){
    padding: 0 5% 0 2%;
    border-right: 2px solid #E0E0E0;
}
.content-box:nth-child(5){
    padding: 0 0 0 3%;
}
.content-title{
    font-size: 18px;
    margin: 0 0 20px 0;
    color: #B4AFAA;
}
.content{
    font-size: 25px;
    margin: 0;
}
</style>