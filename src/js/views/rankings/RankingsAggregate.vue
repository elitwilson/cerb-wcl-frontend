<script setup>
    import { request, gql } from 'graphql-request'
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import AggregateTable from "./components/AggregateTable.vue"

    const parses = ref([])
    const fights = ref([])
    const loading = ref(false)
    const showTable = ref(false)

    async function getFights(code) {
        const query = gql`
        {
            reportData {
                report(code: "${code}") {
                    fights {
                        startTime
                        endTime
                        id
                        encounterID
                    }
                }
	        }
        }`

        axios.post(import.meta.env.VITE_API_URL + "/gqlquery", { query })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

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



    function reset() {
        loading.value = false
        showTable.value = false
        parses.value = []
    }

    async function onSubmit(event) {
        // ToDo: Validate form, show errors, all that stuff

        // Split the report codes by new line
        let codes = event.target.elements.reportCodes.value.split("\n")
        // Loop through the codes and get the data
        loading.value = true
        await getDataForCodes(codes)
        // Done. Show table
        showTable.value = true
        loading.value = false
    }

    function EncounterInfo(code) {
        if (code.type != String) return
        
    }

    // Step 1: Get the data for all the codes
    async function getDataForCodes(codes) {
        let allEncounters = []
        for (let i=0; i < codes.length; i++) {  
            const query = buildQuery(codes[i])
            await getFights(codes[i])
            const encounter = await axios.post(import.meta.env.VITE_API_URL + "/gqlquery", { query })
            allEncounters = allEncounters.concat(encounter.data.reportData.report.rankings.data)
        }
        console.log(allEncounters)
        loopEncounters(allEncounters)
    }

    // Step 2: Loop the encounters and get the fights
    async function loopEncounters(encounters) {
        console.log(encounters.length)
        encounters.forEach(encounter => {
            if (encounter.encounter.id !== 724) { // Exclude Kalecgos
                // Loop through all the characters in the encounter
                encounter.roles.dps.characters.forEach(character => {
                    
                    
                    let match = parses.value.filter(e => e.id === character.id)[0]
                    // If character is in tableData[] already, then append the ranking number and update the entry
                    if (match) {
                        match.bracketPercents.push(character.bracketPercent)
                        match.fightCount++
                    } else {
                        // Otherwise, add the character to the bracket parses list
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
    }
</script>

<template>
    <div v-if="!showTable" class="row justify-content-center">
        <div class="col-sm-4 justify-content-center">
            <span>Paste one report code per line</span>
            <form @submit.prevent="onSubmit">
                <div class="collapse show card card-body row justify-content-center">
                    <textarea class="form-control" id="reportCodes" placeholder="Enter report codes" rows="5"></textarea>
                    <button type="submit" class="btn btn-custom mt-2" style="width: 7em;">Submit
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span v-if="loading" class="visually-hidden">Loading...</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div v-if="showTable" class="row justify-content-center">
        
        <div class="col-sm-4">
            <button @click="reset" type="button" class="btn btn-custom mb-2">Reset</button>   
            <AggregateTable :table-data="parses" />
        </div>        
    </div>
</template>