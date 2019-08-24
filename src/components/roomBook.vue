<template>
  <div class="book-card-container">
    <div class="price-container">
      <div class="price-box">
        <h3>平日(一~四)</h3>
        <h1>$NT {{price.normal}}/晚</h1>
      </div>
      <div class="price-box">
        <h3>假日(五~日)</h3>
        <h1>$NT {{price.holiday}}/晚</h1>
      </div>
    </div>
    <div class="form-container">
      <div>
        <h2>姓名</h2>
        <input
          class="name-input"
          :class="{warn:isName}"
          type="text"
          name="name"
          v-model="name"
          placeholder="王小明"
        />
      </div>
      <div>
        <h2>電話</h2>
        <input
          class="phone-input"
          :class="{warn:phoneCheck}"
          type="text"
          name="phone-number"
          v-model="phoneNum"
          placeholder="0912345678"
        />
        <p class="date-err-text" v-if="isphone">電話未填</p>
      </div>
      <div>
        <h2>日期</h2>
        <HotelDatePicker
          v-on:check-in-changed="getCheckInDate"
          v-on:check-out-changed="getCheckOutDate"
          :closeDatepickerOnClickOutside="false"
          :endDate="bookingEndDay"
          :disabledDates="bookList"
        />
        <p v-if="postCheck" class="date-err-text">日期未填寫正確</p>
      </div>
      <div class="total-container" :class="{'total-container-open':calcTotal.Open}">
        <div>
          <p>平日 $NT{{price.normal}}x{{calcTotal.normal.count}}</p>
          <p>$NT {{calcTotal.normal.total}}</p>
        </div>
        <div>
          <p>假日 $NT{{price.holiday}}x{{calcTotal.holiday.count}}</p>
          <p>$NT {{calcTotal.holiday.total}}</p>
        </div>
        <div>
          <p>服務費</p>
          <p>$NT {{calcTotal.serviceFee}}(10%)</p>
        </div>
        <div>
          <p>總計</p>
          <h2>$NT {{calcTotal.total}}</h2>
        </div>
      </div>
      <button class="post-btn" @click="dataPost()">預訂房間</button>
      <div class="book-success-view" :class="{'success-open':bookSuccess}">
        <div>
          <font-awesome-icon class="success-icon" :icon="['fas','check-circle']" />
          <h2>預訂成功</h2>
          <button @click="goHomePage()">回首頁</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import moment, { weekdays } from "moment";
//import { extendMoment } from "moment-range";
import HotelDatePicker from "vue-hotel-datepicker";
export default {
  components: {
    HotelDatePicker
  },
  props: {
    price: Object,
    roomId: String,
    bookedList: Array
  },
  data() {
    return {
      name: "",
      phoneNum: "",
      isName: false,
      isphone: false,
      checkinDay: {
        str: "",
        ms: 0
      },
      checkoutDay: {
        str: "",
        ms: 0
      },
      bookingEndDay: "",
      postCheck: false,
      newBooking: [],
      bookSuccess: false
    };
  },
  computed: {
    phoneCheck() {
      const isWarn = /^09[0-9]{8,8}$/.test(this.phoneNum);
      if (this.phoneNum === "" || isWarn) {
        return false;
      } else {
        return true;
      }
    },
    calcTotal() {
      if (
        this.checkinDay.str !== "" &&
        this.checkoutDay.str !== "" &&
        this.checkinDay.ms < this.checkoutDay.ms
      ) {
        let checkIn = this.checkinDay.str,
          cheeckOut = this.checkoutDay.str;
        const nhCount = this.calcNormalAndHoliday(checkIn, cheeckOut);
        const normalTotal = nhCount.nCount * this.price.normal;
        const holidayTotal = nhCount.hCount * this.price.holiday;
        const serviceFee = parseInt((normalTotal + holidayTotal) * 0.1);
        const total = normalTotal + holidayTotal + serviceFee;
        return {
          Open: true,
          normal: {
            total: normalTotal,
            count: nhCount.nCount
          },
          holiday: {
            total: holidayTotal,
            count: nhCount.hCount
          },
          serviceFee: serviceFee,
          total: total
        };
      } else {
        return {
          Open: false,
          normal: {
            total: 0,
            count: 0
          },
          holiday: {
            total: 0,
            count: 0
          },
          serviceFee: 0,
          total: 0
        };
      }
    },
    bookList() {
      return this.bookedList.concat(this.newBooking);
    }
  },
  methods: {
    goHomePage(){
      this.$router.push({name:'home'})
    },
    calcNormalAndHoliday(startDay = "", endDay = "") {
      if (startDay !== "" && endDay !== "") {
        let day = new Date(startDay);
        let end = new Date(endDay);
        let nCount = 0;
        let hCount = 0;
        while (day.toDateString() !== end.toDateString()) {
          let weekDay = day.getDay();
          this.checkWeekDay(weekDay) ? nCount++ : hCount++;
          day.setDate(day.getDate() + 1);
        }
        return {
          nCount: nCount,
          hCount: hCount
        };
      }
    },
    checkWeekDay(date = 0) {
      if (date === 1 || date === 2 || date === 3 || date === 4) {
        return true;
      } else {
        return false;
      }
    },
    getCheckInDate(day) {
      if (day !== null) {
        this.checkinDay.str =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        this.checkinDay.ms = day.valueOf();
      }
      //console.log(day);
    },
    getCheckOutDate(day) {
      if (day !== null) {
        this.checkoutDay.str =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        this.checkoutDay.ms = day.valueOf();
      }
      //console.log(day);
    },
    setEndDay() {
      let today = new Date();
      let range = 90;
      today.setDate(today.getDate() + range);
      const endday =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      //console.log(endday);
      this.bookingEndDay = endday;
    },
    getDayArray(startDay = "", endDay = "") {
      let dayList = [];
      let strFilter = function(num = 0) {
        if (num < 10) {
          return "0" + num.toString();
        } else {
          return num.toString();
        }
      };
      if (startDay !== "" && endDay !== "") {
        let dayStr = "";
        let day = new Date(startDay);
        let end = new Date(endDay);
        while (day.toDateString() !== end.toDateString()) {
          let year = strFilter(day.getFullYear());
          let mon = strFilter(day.getMonth() + 1);
          let date = strFilter(day.getDate());
          dayStr = year + "-" + mon + "-" + date;
          dayList.push(dayStr);
          day.setDate(day.getDate() + 1);
        }
        return dayList;
      } else {
        return dayList;
      }
    },
    dataPost() {
      const phoneCheck = /^09[0-9]{8,8}$/.test(this.phoneNum);
      const API = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/";
      if (this.name !== "" && phoneCheck && this.calcTotal.total !== 0) {
        const token = this.$store.state.token;
        const url = API + this.roomId;
        const dayArr = this.getDayArray(
          this.checkinDay.str,
          this.checkoutDay.str
        );
        const config = {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }
        };
        const data = JSON.stringify({
          name: this.name,
          tel: this.phoneNum,
          date: dayArr
        });
        this.axios
          .post(url, data, config)
          .then(res => {
            this.newBooking = dayArr;
            this.bookSuccess=true;
          })
          .catch(err => {});
        this.isName = false;
        this.postCheck = false;
        this.isphone = false;
      } else {
        if (this.name === "") {
          this.isName = true;
        }
        if (this.calcTotal.total === 0) {
          this.postCheck = true;
        }
        if (this.phoneNum === "") {
          this.isphone = true;
        }
      }
    }
  },
  created() {
    //console.log(today.getFullYear(),today.getMonth(),today.getDate());
    this.setEndDay();
    //console.log(this.getDayArray('2019-8-12','2019-8-16'));
  },
  mounted() {
    //console.log(moment().format());
  }
};
</script>
<style lang="scss" scoped>
.book-card-container {
  width: 40%;
  height: fit-content;
  //outline: 1px solid red;
  background-color: white;
  border-radius: 7px;
}
.price-container {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 20px;
  margin: 0;
  border-radius: 7px 7px 0 0;
  height: 150px;
  background-color: #2a58a8;
}
.price-box {
  width: calc(50% - 1.5px);
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  h3,
  h1 {
    margin: 0;
  }
  h3 {
    color: rgba($color: #ffffff, $alpha: 0.5);
  }
  h1 {
    font-size: 30px;
    color: white;
  }
}
.price-box:nth-child(1) {
  border-right: 3px solid rgba($color: #ffffff, $alpha: 0.4);
}
.form-container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 400px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //outline: 1px solid red;
  > * {
    margin: 0 0 20px 0;
  }
  div {
    width: 100%;
  }
  input {
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: 0.1s;
  }
}
.name-input:focus,
.phone-input:focus {
  border: 2px solid #508df6;
}
.name-input.warn,
.phone-input.warn {
  border: 2px solid red;
}
input:focus {
  outline: none;
}
.picker {
  width: 200px;
  * {
    font-size: 0.5rem;
  }
}
.date-picker-input {
  width: 100%;
  input {
    width: 100%;
  }
}
.total-container {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 15px;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: none;
  flex-direction: column;
  overflow: hidden;
  transform-origin: top left;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    font-size: 25px;
    color: #508df6;
  }
}
.total-container-open {
  display: flex;
  animation: totalopen 0.3s linear;
}
.post-btn {
  cursor: pointer;
  box-sizing: border-box;
  padding: 15px;
  background-color: #508df6;
  border: none;
  border-radius: 5px;
  color: white;
  transition: 0.2s;
}
.post-btn:hover {
  transform: scale(1.03);
}
.date-err-text {
  font-size: 15px;
  color: red;
  margin: 0;
}
.book-success-view {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 0 0 7px 7px;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 0.5s;
  opacity: 1;
  justify-content: center;
  align-items: center;
  display: none;
  animation: successopen 0.5s ease-in-out;
  > div {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h2 {
    font-size: 30px;
    color: white;
  }
  button{
    cursor: pointer;
    padding: 10px 30px;
    border: none;
    background: rgb(53, 122, 226);
    border-radius: 8px;
    color: white;
    transition: 0.3s;
  }
  button:hover{
    transform: scale(1.1);
  }
}

.success-icon {
  font-size: 150px;
  color: rgb(70, 226, 83);
}
.success-open {
  display: flex;
}
@keyframes totalopen {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
@keyframes successopen{
  from{
    opacity: 0;
  }to{
    opacity: 1;
  }
}
</style>