import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from 'src/interface/student.interface';
import { CreateStudentDTO } from 'src/dto/create-student.dto';
import { UpdateStudentDTO } from 'src/dto/update-student.dto';


@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel:Model<IStudent>){    
    }


    async createStudent(CreateStudentDTO: CreateStudentDTO):Promise<IStudent>{

        const newStudent = await new this.studentModel(CreateStudentDTO)
        return newStudent.save() // salvar um alunos
    }

    // ler todos os alunos

    async getAllStudents():Promise<IStudent[]>{
        const studentData = await this.studentModel.find()
        if(!studentData || studentData.length == 0){
            throw new NotFoundException("Estudante nao encontrado")
        }
        return studentData
    }

    // obter estudante por ID

    async getStudent(studentId: string):Promise<IStudent>{
        const existingStudent = await this.studentModel.findById(studentId)
        if(!existingStudent){
            throw new NotFoundException(`Estudante ${studentId} nao encontrado!`)
        }
        return existingStudent  
    }

    //deletar aluno por id


    async deleteStudent(studentId:string):Promise<IStudent>{
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId)
        if(!deletedStudent){
            throw new NotFoundException(`Estudante ${studentId} nao encontrado!`)
        }
        return deletedStudent   
    }

    //atualizar estudante por id

    async updateStudent(studentId:string,updateStudentDTO: UpdateStudentDTO):Promise<IStudent>{
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId,updateStudentDTO,{new:true})

        if(!existingStudent){
            throw new NotFoundException(`Estudante ${studentId} nao encontrado!`)
        }

        return existingStudent

    }
}
