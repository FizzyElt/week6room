<template>
  <div
    v-on:click="goRoom()"
    class="room-card"
    :style="{'background-image':'url('+item.imageUrl+')'}"
  >
    <div class="room-data-container">
      <h3 class="room-name">{{item.name}}</h3>
      <div>
        <div class="pay-container">
          <h3>平日(一~四)</h3>
          <h3>$NT {{item.normalDayPrice}}/晚</h3>
        </div>
        <div class="pay-container">
          <h3>假日(五~日)</h3>
          <h3>$NT {{item.holidayPrice}}/晚</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    goRoom() {
      this.$router.push({ name: "room", params: { roomId: this.item.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.room-card {
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 450px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  transition: all 0.3s;
}
.room-card:hover {
  box-shadow: -2px 2px 10px 0.1px rgba(0, 0, 0, 0.3);
}
.room-data-container {
  width: 100%;
  height: 30%;
  background-color: transparent;
  transform: translateY(calc(60% + 2px));
  transition: all 0.3s;
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 2px solid #b4afaa;
  }
}
.room-card:hover .room-data-container {
  transform: translateY(0);
  background-color: white;
}
.room-name {
  position: relative;
  width: fit-content;
  height: calc(40% - 2px);
  font-size: 25px;
  text-align: center;
  color: rgb(4, 122, 87);
  margin: 0;
  overflow: hidden;
  padding: 0 20px;
  left: 0;
  transform: translateX(0%);

  line-height: 2;
  transition: all 0.3s ease-in-out;
}
.room-card:hover .room-name {
  left: 50%;
  transform: translateX(-50%);
}
.pay-container {
  width: 50%;
  height: 60%;
  :first-child {
    color: #b4afaa;
  }
  h3 {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }
}
</style>