<script setup>
    import { request, gql } from 'graphql-request'
    import { ref } from 'vue'
    import axios from 'axios'
    import AggregateTable from "./components/AggregateTable.vue"

    const data = ref()
    let showTable = ref(false)

    function buildQuery(code) {
        const query = gql`
        {
            reportData {
                report(code: "${code}") {
                    rankings
                }
            }
        }`
        return query
    }

    function onSubmit(event) {
        console.log(import.meta.env.VITE_API_URL)
        axios.get(import.meta.env.VITE_API_URL)
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
        // ToDo: Validate form, show errors, all that stuff

        // Split the report codes by new line
        let codes = event.target.elements.reportCodes.value.split("\n")
        // Loop through the codes and get the data
        codes.forEach(code => {
            //request('https://api.spacex.land/graphql/', buildQuery(code)).then((data) => console.log(data))
            // Loop through all the encounters

            // ToDo: Handle exclusions

            // loop through all characters in the encounter

            // If character is in the array already, then append the ranking number and update the entry

            showTable = true;
        })
    }

    // var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
    // var collapseList = collapseElementList.map(function (collapseEl) {
    //     return new bootstrap.Collapse(collapseEl)
    // })
</script>

<template>
    <div v-if="!showTable" class="row justify-content-center">
        <form class="col-4" @submit.prevent="onSubmit">
        
            <div class="collapse show card card-body row justify-content-center">
                <textarea class="form-control" id="reportCodes" placeholder="Enter report codes" rows="5"></textarea>
                <button type="submit" class="btn btn-custom mt-2" style="width: 5em;">Submit</button>
            </div>
        </form>
    </div>
    <div v-if="showTable" class="row justify-content-center">
        
        <div class="col-4">
            <button @click="function() {showTable = false }" type="button" class="btn btn-custom mb-2">Reset</button>   
            <AggregateTable />
        </div>        
    </div>
</template>