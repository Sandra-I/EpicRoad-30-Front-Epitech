<template>
    <div class="navbar">
        <img
            class="logo"
            alt="epic road trip logo"
            src="../assets/worldwide.svg"
        />
        <div>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field class="input" solo label="Address" align="center" hide-details="auto"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" class="attached">
                            <v-text-field solo label="Check-in" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="6" class="attached">
                            <v-text-field class="input" solo label="Check-out" hide-details="auto"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                    <v-text-field class="input" solo label="Budget" hide-details="auto"></v-text-field>
                </v-col>
            </v-row>
        </div>
        <div class="user-section">
            <v-btn depressed large>
                My trips
                <img src="../assets/heart.svg" />
            </v-btn>
            <v-btn depressed large color="primary"> Connexion </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
};
</script>

<style lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-bottom: 50px;

    .logo {
        width: 40px;
        height: 40px;
    }

    .v-input {
        border-radius: 30px;
        .v-input__slot {
            background: #f5f5f5 !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
            box-shadow: none !important;
            padding: 0 20px !important;
        }
    }

    .user-section {
        button {
            margin-right: 20px;
            width: 140px;
            img {
                height: 16px;
                width: 16px;
                margin-left: 10px;
            }
        }
    }

    .attached {
        &:first-child {
            padding-right: 2px;
            .v-input {
                border-radius: 20px 0 0 20px;
            }
        }
        &:last-child {
            padding-left: 2px;
            .v-input {
                border-radius: 0 20px 20px 0;
            }
        }
    }

}
</style>
