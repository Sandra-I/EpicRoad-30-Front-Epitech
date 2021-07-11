<template>
    <div>
        <input
            solo
            class="address-input"
            ref="autocomplete"
            placeholder="Location"
            :value="savedAddress"
        />
    </div>
</template>

<script>
export default {
    name: "AddressInput",
    props: {
        savedAddress: String
    },
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
                "zip_code": (place.address_components[6]) ? place.address_components[6].short_name : "",
                "country": (place.address_components[5]) ? place.address_components[5].long_name: "",
                "lat": place.geometry.location.lat(),
                "lng": place.geometry.location.lng()
            }
            this.$emit('autocomplete', address)
        });
    }
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
    background-color: #ececec;
}
</style>