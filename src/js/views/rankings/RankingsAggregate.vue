<script setup>
    import { request, gql } from 'graphql-request'
    import { ref } from 'vue'
    import AggregateTable from "./components/AggregateTable.vue"

    const data = ref()
    let tableIsShowing = ref(true)

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
        // ToDo: Validate form, show errors, all that stuff

        // Split the report codes by new line
        let codes = event.target.elements.reportCodes.value.split("\n")
        // Loop through the codes and get the data
        codes.forEach(x => {
            // Loop through all the encounters

            // ToDo: Handle exclusions

            // loop through all characters in the encounter

            // If character is in the array already, then append the ranking number and update the entry

            tableIsShowing = true;
        })
    }

    // var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
    // var collapseList = collapseElementList.map(function (collapseEl) {
    //     return new bootstrap.Collapse(collapseEl)
    // })
</script>

<template>
    <div v-if="!tableIsShowing" class="row justify-content-center">
        <form class="col-4" @submit.prevent="onSubmit">
        
            <div class="collapse show card card-body row justify-content-center">
                <textarea class="form-control" id="reportCodes" placeholder="Enter report codes" rows="5"></textarea>
                <button type="submit" class="btn btn-custom mt-2" style="width: 5em;">Submit</button>
            </div>
        </form>
    </div>
    <div v-if="tableIsShowing" class="row justify-content-center">
        
        <div class="col-4">
            <button @click="function() {tableIsShowing = false }" type="button" class="btn btn-custom mb-2">Reset</button>   
            <AggregateTable />
        </div>        
    </div>
</template>