import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: "root"
})
export class APIService {
  async GetEmployee(email: string): Promise<Employee> {
    const statement =
      `query GetEmployee($email: ID!) {
      getEmployee(email: $email) {
          email
          firstName
          lastName
          secondName
          position
          telephone
          linkedin
          Certifications{
            id
            url
            img
            description
            order
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      email
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <Employee>response.data.getEmployee;
  }

  async UpdateEmployee(input: Employee): Promise<Employee> {
    console.log("INPUT:", input)
    let statement = `mutation updateEmployee($input: EmployeeInput!) {
      updateEmployee(input: $input) {
        firstName
        lastName
        secondName
        position
        telephone
        linkedin
        Certifications{
          id
          url
          img
          description
          order
        }
      }}`;
    console.log("STATEMENT:", statement)
    const gqlAPIServiceArguments: any = {
      input
    };
    console.log("GRAPH Arguments:", gqlAPIServiceArguments)
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <Employee>response.data.updateEmployee;
  }

}