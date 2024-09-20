<template>
    <div class="mb-6">
        <div class="relative">
            <button @click="prevSeries"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
                &#9664;
            </button>
            <button @click="nextSeries"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
                &#9654;
            </button>
            <div class="overflow-hidden">
                <div class="flex transition-transform duration-300 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                    <div v-for="serie in series" :key="serie.id" class="w-full flex-shrink-0">
                        <div class="featured-content mb-12">
                            <div class="relative overflow-hidden rounded-lg" style="height: 500px;">
                                <img :src="serie.thumbnail" :alt="serie.title"
                                    class="w-full h-full object-cover" />
                                <div
                                    class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                                    <h2 class="text-4xl font-bold mb-2">{{ serie.title }}</h2>
                                    <p class="text-lg mb-4">{{ serie.description }}</p>
                                    <a :href="`/${serie.id}`"
                                        class="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                        Ver ahora
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-4">
            <div v-for="(_, index) in series" :key="index" @click="setCurrentIndex(index)"
                class="w-3 h-3 rounded-full mx-1 cursor-pointer"
                :class="index === currentIndex ? 'bg-white' : 'bg-gray-500'">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    series: {
        type: Array,
        required: true
    }
});

const currentIndex = ref(0);

const nextSeries = () => {
    currentIndex.value = (currentIndex.value + 1) % props.series.length;
};

const prevSeries = () => {
    currentIndex.value = (currentIndex.value - 1 + props.series.length) % props.series.length;
};

const setCurrentIndex = (index) => {
    currentIndex.value = index;
};

watch(currentIndex, (newIndex) => {
    emit('series-selected', props.series[newIndex]);
});

const emit = defineEmits(['series-selected']);
</script>