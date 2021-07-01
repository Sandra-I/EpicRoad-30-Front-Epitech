<template>
    <div class="description">
        <h3>Description</h3>
        <p>{{ item.description }}</p>
    </div>
</template>

<script>
export default {
    name: "Description",
    props: ["item"],
};
</script>

<style lang="scss">
.description {
    h3 {
        font-size: 1.5rem;
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
