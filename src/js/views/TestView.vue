<script>
//import gql from 'graphql-tag'
import { request, gql } from 'graphql-request'
const query = gql`
        {
            allSubjects {
                id,
                firstName,
                lastName,
                studies {
                    id,
                    shortName,
                    title,
                    active
                }
            }
        }
        `
export default {
    name: 'my-component',
    data: () => ({
        allSubjects: ''
    }),
    created() {
        // Fetch on init
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const result = request('http://localhost:8080/query', query)
            .then((data) => {
                this.allSubjects = data.allSubjects
            })
        }
    }
}   
</script>

<template>
    <div>
        <table>
            <thead>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Studies</th>
            </thead>
            <tr v-for="subject in allSubjects">
                <td>{{ subject.firstName }}</td>
                <td>{{ subject.lastName }}</td>
                <td>
                    <span v-for="study in subject.studies">
                        {{ study.shortName }}
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>