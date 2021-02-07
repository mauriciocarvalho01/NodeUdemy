
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export interface IParametro {

	ID_T_PARM: string;
	CD_PARM: string;
	TXT_DESC_PARM: string;
	CN_PARM: string;
	ID_SIT_PARM: string;
	ID_USR_INC: string;
	DT_H_INC: Date;
	ID_USR_ATC: string;
	DT_H_ATC: Date;
}


@Entity({ name: 'CESTPAR' })
export default class Parametro extends BaseEntity implements IParametro {

	@PrimaryColumn({ name: 'ID_T_PARM', type: 'varchar'})
	public ID_T_PARM: string;

	@Column('varchar', { nullable: true, name: 'CD_PARM' })
	public CD_PARM: string;

	@Column('varchar', { nullable: true, name: 'TXT_DESC_PARM' })
	public TXT_DESC_PARM: string;

	@Column('varchar', { nullable: true, name: 'CN_PARM' })
	public CN_PARM: string;

	@Column('varchar', { nullable: true, name: 'ID_SIT_PARM' })
	public ID_SIT_PARM: string;

	@Column('varchar', { nullable: true, name: 'ID_USR_INC' })
	public ID_USR_INC: string;

	@Column('date', { nullable: true, name: 'DT_H_INC' })
	public DT_H_INC: Date;

	@Column('varchar', { nullable: true, name: 'ID_USR_ATC' })
	public ID_USR_ATC: string;

	@Column('date', { nullable: true, name: 'DT_H_ATC' })
	public DT_H_ATC: Date;

}

