<template>
    <div class="attributes">
        <h3>Attributes</h3>
        <div class="attributes">
            <div v-for="attribute in item.attributes" :key="attribute.key" class="attribute">
                <span>{{ attribute }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Attributes",
    props: ["item"],
};
</script>

<style lang="scss">
.attributes {
    h3 {
        font-size: 1.5rem;
        width: 100%;
        margin-bottom: 10px;
    }
    .attributes {
        display: flex;
        flex-wrap: wrap;
        .attribute {
            padding: 10px 20px;
            margin-bottom: 20px;
            margin-right: 20px;
            border-radius: 5px;
            background-color: #f2f2f2;
        }    
    }
}
</style>
