<template>
    <div class="footer gutter">
        <v-row>
            <v-col cols="12" xs="12" sm="4" md="2" lg="3">
                <ul>
                    <li>Login</li>
                    <li>Register</li>
                    <li>Profile</li>
                </ul>
            </v-col>
            <v-col cols="12" xs="12" sm="4" md="3" lg="3">
                <ul>
                    <li>Accomodation in Paris</li>
                    <li>Restaurants in Paris</li>
                    <li>Activities in Paris</li>
                </ul>
            </v-col>
            <v-col cols="12" xs="12" sm="4" md="3" lg="3">
                <ul>
                    <li>Homepage</li>
                    <li>Legal mentions</li>
                </ul>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="4" lg="3" class="logo">
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
    background-color: var(--v-primary-base);
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 200px;
    padding: 40px 0;

    .logo {
        text-align: right;
    }

    ul {
        font-size: 14px;
        list-style-type: none;
        padding: 0 !important;

        li {
            color: #fff;
            font-weight: 500;
            text-align: left;
            margin-bottom: 15px;
        }
    }

    h1 {
        font-family: "Viga";
        letter-spacing: 1px;
        color: #fff;
    }

    span {
        color: #fff;
        font-size: 12px;
    }

}

@media screen and (max-width: 960px) {
    .footer {
        position: relative;
        .logo {
            margin-top: 10px;
            text-align: left;
        }
    }
}
</style>
