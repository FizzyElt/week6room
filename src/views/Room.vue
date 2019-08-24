<template>
  <div class="room-detail-container" v-if="dataOk">
    <roomImageShow :imgUrlList="roomData.imageUrl"></roomImageShow>
    <div class="room-detail">
      <roomDetailNav :itemList="navData"></roomDetailNav>
      <div class="room-content-box">
        <roomDescription :roomName="roomData.name" :roomDescription="roomData.description" :roomAmenities="amenitiesListFilter(roomData.amenities)"></roomDescription>
        <roomBook :bookedList="bookingDayList" :roomId="roomId" :price="getPrice(roomData.normalDayPrice,roomData.holidayPrice)"></roomBook>
      </div>
    </div>
  </div>
</template>
<script>
import roomImageShow from "../components/roomImageShow.vue";
import roomDetailNav from "../components/roomDetailNav.vue";
import roomDescription from "../components/roomDescirption.vue"
import roomBook from "../components/roomBook.vue"
export default {
  components: {
    roomImageShow,
    roomDetailNav,
    roomDescription,
    roomBook
  },
  data() {
    return {
      roomData: null,
      dataOk: false,
      bookedList:[],
      roomId:''
    };
  },
  computed: {
    navData() {
      const descriptionShort = this.roomData.descriptionShort;
      const checkInAndOut = this.roomData.checkInAndOut;
      return {
        descriptionShort,
        checkInAndOut
      };
    },
    bookingDayList(){
      if(this.bookedList.length){
        return this.bookedList.map(item=>{
          return item.date
        })
      }else{
        return []
      }
    }
  },
  methods: {
    getRoomData(id = "") {
      const API = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/";
      const url = API + id;
      const token = this.$store.state.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      this.roomId=id;
      if (id) {
        this.axios
          .get(url, config)
          .then(res => {
            this.roomData = res.data.room[0];
            this.dataOk = true;
            this.bookedList=res.data.booking;
          })
          .catch();
      } else {
        console.log("no id");
      }
    },
    getPrice(normal=0,holiday=0){
      return {
        normal:normal,
        holiday:holiday
      }
    },
    amenitiesListFilter(data={}){
            const list=[
                {
                    name:'wifi',
                    isOpen:data['Wi-Fi'],
                    iconName:'wifi'
                },
                {
                    name:'早餐',
                    isOpen:data['Breakfast'],
                    iconName:'coffee'
                },
                {
                    name:'Mini-Bar',
                    isOpen:data['Mini-Bar'],
                    iconName:'wine-glass-alt'
                },
                {
                    name:'Room Service',
                    isOpen:data['Room-Service'],
                    iconName:'concierge-bell'
                },
                {
                    name:'電視',
                    isOpen:data['Television'],
                    iconName:'tv'
                },
                {
                    name:'空調',
                    isOpen:data['Air-Conditioner'],
                    iconName:'wind'
                },
                {
                    name:'冰箱',
                    isOpen:data['Refrigerator'],
                    iconName:'door-closed'
                },
                {
                    name:'沙發',
                    isOpen:data['Sofa'],
                    iconName:'couch'
                },
                {
                    name:'漂亮的視野',
                    isOpen:data['Great-View'],
                    iconName:'mountain'
                },
                {
                    name:'允許吸菸',
                    isOpen:data['Smoke-Free'],
                    iconName:'smoking'
                },
                {
                    name:'適合兒童',
                    isOpen:data['Child-Friendly'],
                    iconName:'baby'
                },
                {
                    name:'寵物攜帶',
                    isOpen:data['Pet-Friendly'],
                    iconName:'dog'
                }
            ]
            return list
        }
  },
  created() {
    this.getRoomData(
      this.$route.params.roomId||'YovqNpFDaal598jbpd1A14gXwDE6gekTqJgxOAGcq78B8YnP7claymQVFy2GTwgb'
    );
  }
};
</script>
<style lang="scss">
.room-detail-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.room-detail {
  width: 80%;
  margin-bottom: 50px;
}
.room-content-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>