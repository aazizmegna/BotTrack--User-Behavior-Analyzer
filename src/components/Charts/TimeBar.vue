<template>
    <div class="time-bar-container">
        <div class="time-bar" :style="{ width: width + 'px', height: height + 'px' }">
            <div v-for="(part, index) in parts" :key="index"
                :style="{ backgroundColor: colorMap[part.color] || part.color, width: part.time + '%', height: '100%' }"
                :class="{ clickable: part.clickable }" @click="handleClick(part)"></div>
        </div>
        <div class="time-indicators">
            <div v-for="n in 13" :key="n" class="time-indicator" :style="{ left: ((n - 1) / 12 * 100) + '%' }">{{ n - 1 }}
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TimeBar',
    props: {
        parts: {
            type: Array,
            required: true,
        },
        width: {
            type: Number,
            default: 100,
        },
        height: {
            type: Number,
            default: 10,
        },
        id: {
            type: String,
            default: "",
        }
    },
    computed: {
        colorMap() {
            return {
                unproductive: '#f56c6c',
                productive: '#67c23a',
                afk: '#ffeb3b',
            };
        },
    },
    methods: {
        handleClick(part) {
            if (part.clickable) {
                this.$emit('part-clicked', part);
            }
        },
    },
};
</script>
  
<style>
.time-bar {
    display: flex;
}

.time-bar div {
    margin-right: 2px;
}

.time-bar-container {
    display: flex;
    flex-direction: column;
}

.time-indicators {
    display: flex;
    position: relative;
    height: 20px;
    margin-top: 10px;
}

.time-indicator {
    position: absolute;
    top: 0;
    width: calc(100% / 12);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    border-left: 1px solid #ccc;
}
</style>
  