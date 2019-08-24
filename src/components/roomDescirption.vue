<template>
  <div class="room-content-container">
    <div class="description-container">
      <h2 class="room-title">{{roomName}}</h2>
      <p>{{roomDescription}}</p>
    </div>
    <div class="amenities-container">
      <h2>設備與服務</h2>
      <ul class="service-list">
        <li class="service-item" v-for="item in roomAmenities">
          <font-awesome-icon class="icon" :icon="item.iconName" />
          <span>{{item.name}}：{{item.isOpen?'有':'無'}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomName: String,
    roomDescription: String,
    roomAmenities: Array
  },

  methods: {

  },
  created() {},
  mounted() {
    //this.amenitiesListFilter();
  }
};
</script>
<style lang="scss" scoped>
.room-content-container {
  max-width: 55%;
}
.description-container {
  border-left: 5px solid #508df6;
  padding-left: 25px;
}
.room-title {
  font-size: 35px;
  color: #508df6;
}
.amenities-container {
    margin-top: 40px;
  h2 {
    font-size: 26px;
  }
}
.service-list {
  width: calc(100% - 84px);
  border: 2px solid #e0e0e0;
  padding: 40px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 15px 10px;
}
.service-item {
  list-style: none;
}
.icon {
  width: 25px;
  height: 25px;
  margin-right: 8px;
}
</style>