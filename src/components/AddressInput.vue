<template>
    <div>
        <input
            class="address-input"
            ref="autocomplete"
            placeholder="Location"
        />
    </div>
</template>

<script>
export default {
    name: "AddressInput",
    mounted() {
        this.autocomplete = new window.google.maps.places.Autocomplete(
            this.$refs.autocomplete,
            { types: ["geocode"] }
        );
        this.autocomplete.addListener("place_changed", () => {
            const place = this.autocomplete.getPlace();
            const address = {
                "formatted_address": place.formatted_address,
                "street_number": place.address_components[0].short_name,
                "street": place.address_components[1].short_name,
                "city": place.address_components[2].short_name,
                "zip_code": place.address_components[6].short_name,
                "country": place.address_components[5].long_name,
                "lat": place.geometry.location.lat(),
                "lng": place.geometry.location.lng()
            }
            this.$emit('autocomplete', address)
        });
    },
};
</script>

<style scoped lang="scss">
.address-input {
    width: 100%;
    min-height: 48px;
    padding: 0 12px;
    border-radius: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>