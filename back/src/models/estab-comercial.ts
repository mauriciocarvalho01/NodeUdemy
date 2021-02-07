
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export interface IEstabComercial {
	CD_EC: number;
	ID_CPF_CNPJ_EC: string;
	CD_EC_MATZ: number;
	ID_EMAIL_CTO_EMP: string;
	ID_NUM_CLLR_EC: string;
	ID_SS_EC: string;
	V_MAX_TRSC: number;
	V_MAX_DIAR: number;
	V_MAX_MENS: number;
	DT_H_INC: Date;
	DT_H_ATC: Date;
	NM_FANT_EC: string;
}

@Entity({ name: 'CESTECO' })
export default class EstabComercial extends BaseEntity implements IEstabComercial {
	@PrimaryColumn({ name: 'CD_EC', type: 'bigint'})
	public CD_EC: number;

	@Column('varchar', { nullable: true, name: 'ID_CPF_CNPJ_EC' })
	public ID_CPF_CNPJ_EC: string;

	@Column('bigint', { nullable: true, name: 'CD_EC_MATZ' })
	public CD_EC_MATZ: number;

	@Column('varchar', { nullable: true, name: 'ID_EMAIL_CTO_EMP' })
	public ID_EMAIL_CTO_EMP: string;

	@Column('varchar', { nullable: true, name: 'ID_NUM_CLLR_EC' })
	public ID_NUM_CLLR_EC: string;

	@Column('varchar', { nullable: true, name: 'ID_SS_EC' })
	public ID_SS_EC: string;

	@Column('decimal', { nullable: true, name: 'V_MAX_TRSC' })
	public V_MAX_TRSC: number;

	@Column('decimal', { nullable: true, name: 'V_MAX_DIAR' })
	public V_MAX_DIAR: number;

	@Column('decimal', { nullable: true, name: 'V_MAX_MENS' })
	public V_MAX_MENS: number;

	@Column('date', { nullable: true, name: 'DT_H_INC' })
	public DT_H_INC: Date;

	@Column('date', { nullable: true, name: 'DT_H_ATC' })
	public DT_H_ATC: Date;

	@Column('varchar', { nullable: true, name: 'NM_FANT_EC' })
	public NM_FANT_EC: string;

}

