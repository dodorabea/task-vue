<template>
    <v-container>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="searchQuery" label="search and filter products..." clearable
                            required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
    <v-container class="text-center" v-if="products.length">
        <div v-for="(items, category) in groupedByCategory" :key="category" class="category-group pb-9">
            <h4 class="title mb-4 capitalize-text">{{ category }} Groups ⚡</h4>
            <v-row density="comfortable">
                <v-col v-for="prod in items" :key="prod.id" cols="12" md="4">
                    <ProductCard :product="prod" />
                </v-col>
            </v-row>
            <v-divider :thickness="2" class="border-opacity-25 mt-9" color="success"></v-divider>
        </div>
    </v-container>
    <v-container>
        <v-alert v-if="Object.keys(groupedByCategory).length === 0" text="No products found" type="error"></v-alert>
    </v-container>
</template>

<style lang="scss">
.title {
    position: relative;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: max-content;
    padding-inline-start: 16px;

    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 3px;
        height: calc(100% - 0px);
        background-color: #4CAF50;
        border-radius: 25px;
        inset-inline-start: 0;
    }
}
.v-card {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}
.prodct__card {
    &--title {
        font-size: 24px;
        font-weight: 600;
    }
}

.ellipsed {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<script>
import ProductCard from '../components/ProductCard.vue';
export default {
    components: {
        ProductCard
    },
    data() {
        return {
            searchQuery: '',
            valid: true
        }
    },
    computed: {
        products() {
            return this.$store.state.products
        },
        groupedByCategory() {
            const groups = {}

            if (!this.searchProducts) return groups

            this.searchProducts.forEach(prod => {
                const cat = prod.category || "Other"
                if (!groups[cat]) groups[cat] = []
                groups[cat].push(prod)
            })

            return groups
        },
        searchProducts() {
            if (!this.searchQuery) return this.products

            const query = this.searchQuery.toLowerCase()

            return this.products.filter(prod =>
                prod.title?.toLowerCase().includes(query)
            )
        }
    },
    async mounted() {
        await this.$store.dispatch('getProducts')
    }
}
</script>