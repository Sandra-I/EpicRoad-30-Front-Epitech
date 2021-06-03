<template>
    <div class="result-preview">
        <div class="square">
            <img alt="accomodation 1" :src="image" />
        </div>
        <div class="details">
            <label>{{ result.name }}</label>
            <span>{{ result.address }}</span>
            <span>{{ result.equipment }}</span>
            <div class="price">
                <span v-if="result.price_detail">{{ result.price_detail }}</span>
                <span class="total">{{ result.total }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResultPreview",
    props: ["result"],
    data: (vm) => ({
        image: require('../assets/'+vm.result.img)
    })
};
</script>

<style lang="scss">
.result-preview {
    display: flex;
    text-align: left;
    margin-bottom: 50px;
    .square {
        position: relative;
        display: block;
        margin: auto;
        width: 25%;
        &::before {
            content: "";
            padding-top: 100%;
            display: block;
        }
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            top: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            border-radius: 5%;
        }
    }
    .details {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        padding: 10px 0 10px 5%;
        justify-content: space-between;
        width: 75%;
        label {
            font-weight: bold;
            font-size: 1.2rem;
        }
        .price {
            display: flex;
            justify-content: space-between;
            .total {
                font-weight: bold;
            }
        }
    }
}
</style>
