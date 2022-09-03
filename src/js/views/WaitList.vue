<script>
    import { request, gql } from 'graphql-request'
    const query = gql`
    {
        reportData {
            report(code: "VdaD3qRFPA6Mbmtn") {
                rankings
            }
        }
    }`
    export default {
        name: "waitlist",
        data: () => ({
            allData: {},
        }),
        created() {
            // Fetch on init
            this.fetchData();
        },
        methods: {
            async fetchData() {
            const result = request("http://localhost:3001/gqlquery", query).then(
                (data) => {
                    this.allData = data
                }
            );
            },
        },
    };
</script>

<template>
    <div>
        WaitList {{ allData }}
    </div>
</template>