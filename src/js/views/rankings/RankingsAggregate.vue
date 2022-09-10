<script setup>
    import { request, gql } from 'graphql-request'
    import { ref } from 'vue'
    import axios from 'axios'
    import AggregateTable from "./components/AggregateTable.vue"
    import { parseStringStyle } from '@vue/shared';

    const parses = ref([])
    const loading = ref(false)
    const showTable = ref(false)

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

    async function onSubmit(event) {
        // ToDo: Validate form, show errors, all that stuff

        // Split the report codes by new line
        let codes = event.target.elements.reportCodes.value.split("\n")
        // Loop through the codes and get the data
        
        await getDataForCodes(codes).then((res) => {
            loading.value = true
        })

            // Loop through all the encounters
            

            // ToDo: Handle exclusions

            // loop through all characters in the encounter

            // If character is in the array already, then append the ranking number and update the entry

            
        
    }

    // Step 1: Get the data for all the codes
    async function getDataForCodes(codes) {
        codes.forEach(code => {
            const query = buildQuery(code)
            axios.post(import.meta.env.VITE_API_URL + "/gqlquery", { query })
                .then((res) => {
                    loopEncounters(res.data.data)
                })
                .then(() => {
                    //console.log(parses.value)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    // Step 2: Loop the encounters and get the fights
    async function loopEncounters(encounters) {
        encounters.forEach(encounter => {
            if (encounter.encounter.id !== 724) { // Exclude Kalecgos
                // Loop through all the characters in the encounter
                encounter.roles.dps.characters.forEach(character => {
                    loading.value = false
                    showTable.value = true
                    let match = parses.value.filter(e => e.id === character.id)[0]
                    // If character is in tableData[] already, then append the ranking number and update the entry
                    if (match) {
                        match.bracketPercents.push(character.bracketPercent)
                        match.fightCount++
                    } else {
                        // Otherwise, add the character to the list bracket parses list
                        const newEntry = {
                            id: character.id,
                            name: character.name,
                            bracketPercents: [character.bracketPercent],
                            fightCount: 1
                        }
                        parses.value.push(newEntry)
                    }                    
                })
            }
        })
        // console.log(parses.value)
    }
</script>

<template>
    <div v-if="!showTable" class="row justify-content-center">
        <form class="col-4" @submit.prevent="onSubmit">
        
            <div class="collapse show card card-body row justify-content-center">
                <textarea class="form-control" id="reportCodes" placeholder="Enter report codes" rows="5"></textarea>
                <button type="submit" class="btn btn-custom mt-2" style="width: 7em;">Submit
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="loading" class="visually-hidden">Loading...</span>
                </button>
            </div>
        </form>
    </div>
    <div v-if="showTable" class="row justify-content-center">
        
        <div class="col-4">
            <button @click="function() {showTable = false }" type="button" class="btn btn-custom mb-2">Reset</button>   
            <AggregateTable :table-data="parses" />
        </div>        
    </div>
</template>