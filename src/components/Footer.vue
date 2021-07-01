<template>
    <div class="footer">
        <v-row>
            <v-col cols="12" sm="3" md="3">
                <ul>
                    <li>Homepage</li>
                    <li>Legal mentions</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="3" md="3">
                <ul>
                    <li>Login</li>
                    <li>Register</li>
                    <li>Profile</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="3" md="3">
                <ul>
                    <li>Accomodation in Paris</li>
                    <li>Restaurants in Paris</li>
                    <li>Activities in Paris</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="3" md="3" class="text-right">
                <h1>Epic Road Trip</h1>
                <span>© Copyright 2021</span>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style lang="scss">
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 10vw;
    margin: 50px -10vw 0 -10vw;
    background-color: var(--v-primary-base);

    ul {
        list-style-type: none;
        li {
            color: #fff;
            font-weight: 500;
            text-align: left;
            margin-bottom: 15px;
        }
    }

    h1 {
        font-family: "Viga";
        letter-spacing: 2px;
        color: #fff;
    }

    span {
        color: #fff;
    }
}
</style>
