<script setup>
    import { computed } from 'vue'
    const props = defineProps({
        tableData: Array
    })

    function avgparses(parses) {
        let p = parses.reduce((a, b) => a + b) / parses.length;
        return Math.round(p)
    }

    // const sortedRows = computed((data) => {
    //     return data
    // })
    // if (props.tableData) {
    //     console.log(sortedRows(tableData))
    // }
    

</script>

<template>
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Character</th>
                <th scope="col">Avg. Parses</th>
                <th scope="col"># of Fights</th>
            </tr>
            <tr v-for="row in tableData">
                <td>{{row.name}}</td>
                <td>{{ avgparses(row.bracketPercents)}}</td>
                <td>{{row.fightCount}}</td>
            </tr>
        </thead>
    </table>
</template>