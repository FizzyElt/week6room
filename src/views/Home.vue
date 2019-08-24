<template>
  <div class="home">
    <div class="room-btn-container">
      <div class="room-btn-list">
        <button class="room-list-btn room-list-btn-active">精選房源</button>
        <button class="room-list-btn">好評房源</button>
        <button class="room-list-btn">特殊房源</button>
        <button class="room-list-btn">評價房源</button>
      </div>
    </div>
    <div class="room-items-container">
      <div class="room-items-center">
        <roomCard v-for="item in RoomListData" :item="item" ></roomCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import roomCard from "../components/roomCard.vue";
export default {
  components: {
    roomCard
  },
  data() {
    return {
      RoomListData: null,
      roomdata: {
        id: "3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu",
        imageUrl:
          "https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
        normalDayPrice: 1380,
        holidayPrice: 1500,
        name: "Single Room"
      }
    };
  },
  methods: {
    getRoomList() {
      const token = this.$store.state.token;
      const url = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      this.axios
        .get(url, config)
        .then(res => {
          this.RoomListData = res.data.items;
        })
        .catch();
    }
  },

  created() {
    this.getRoomList();
  },
  mounted(){
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
}
.room-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #e0e0e0;
}
.room-btn-list {
  width: 80%;
  display: flex;
}
.room-list-btn {
  cursor: pointer;
  width: 150px;
  height: 60px;
  margin-right: 15px;
  background: transparent;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  transition: all 0.2s;
}
.room-list-btn:hover {
  background: white;
  color: #2a58a8;
}
.room-list-btn-active {
  background: white;
  color: #2a58a8;
}
.room-items-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
.room-items-center {
  width: 80%;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 30px 2%;
}
</style>