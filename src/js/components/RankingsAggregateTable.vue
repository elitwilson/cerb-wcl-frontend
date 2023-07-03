<script setup lang="ts">
    import { PropType, computed } from 'vue'
    const props = defineProps({
        tableData: Array as PropType<any>,
    })

    function avgparses(parses: any[]) {
        let p = parses.reduce((a: any, b: any) => a + b) / parses.length;
        return Math.round(p)
    }

    const sortedRows = computed(() => {
        props.tableData.forEach((item: any) => {
            // Average the rankings for each character
            item.bracketPercents = avgparses(item.bracketPercents)
        })
        //props.tableData.sort((a,b) => (a.bracketPercents > b.bracketPercents) ? 1 : ((b.bracketPercents > a.bracketPercents) ? -1 : 0))
        props.tableData.sort((a: { bracketPercents: number; },b: { bracketPercents: number; }) => b.bracketPercents - a.bracketPercents);
        let sorted = props.tableData
        return sorted
    })
    if (props.tableData) {
        console.log(sortedRows)
    }

</script>

<template>
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Character</th>
                <th scope="col">Avg. Parses</th>
                <th scope="col"># of Fights</th>
            </tr>
            <tr v-for="row in sortedRows">
                <td>{{row.name}}</td>
                <td>{{ row.bracketPercents }}</td>
                <td>{{row.fightCount}}</td>
            </tr>
        </thead>
    </table>
</template>