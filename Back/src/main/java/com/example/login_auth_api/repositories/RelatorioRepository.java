package com.example.login_auth_api.repositories;

import com.example.login_auth_api.domain.fornecedor.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelatorioRepository extends JpaRepository<Fornecedor, Integer> {

    @Query(value = """
        WITH anos AS (
            SELECT 2024 AS ano UNION ALL SELECT 2025
        ),
        meses AS (
            SELECT generate_series(1, 12) AS mes
        ),
        faturamento AS (
            SELECT
                f.id_fornecedor,
                a.ano,
                m.mes
            FROM
                tbfornecedor f
            CROSS JOIN anos a
            CROSS JOIN meses m
            WHERE
                (
                    EXTRACT(YEAR FROM f.data_cadastro_fornecedor) < a.ano
                    OR (
                        EXTRACT(YEAR FROM f.data_cadastro_fornecedor) = a.ano
                        AND EXTRACT(MONTH FROM f.data_cadastro_fornecedor) <= m.mes
                    )
                )
                AND make_date(a.ano, m.mes, 1) <= CURRENT_DATE
        )
        SELECT
            ano,
            COUNT(*) AS total_mensalidades,
            COUNT(*) * 150 AS faturamento_bruto_anual,
            COUNT(*) * 100 AS lucro_anual
        FROM faturamento
        GROUP BY ano
        ORDER BY ano
    """, nativeQuery = true)
    List<Object[]> consultarFaturamentoAgrupado();

    @Query(value = """
    WITH anos AS (
        SELECT 2024 AS ano UNION ALL SELECT 2025
    ),
    meses AS (
        SELECT generate_series(1, 12) AS mes
    ),
    faturamento AS (
        SELECT
            f.id_fornecedor,
            a.ano,
            m.mes
        FROM
            tbfornecedor f
        CROSS JOIN anos a
        CROSS JOIN meses m
        WHERE
            (
                EXTRACT(YEAR FROM f.data_cadastro_fornecedor) < a.ano
                OR (
                    EXTRACT(YEAR FROM f.data_cadastro_fornecedor) = a.ano
                    AND EXTRACT(MONTH FROM f.data_cadastro_fornecedor) <= m.mes
                )
            )
            AND make_date(a.ano, m.mes, 1) <= CURRENT_DATE
    )
    SELECT
        ano,
        mes,
        COUNT(*) AS total_mensalidades,
        COUNT(*) * 150 AS faturamento_bruto_mensal,
        COUNT(*) * 100 AS lucro_mensal
    FROM faturamento
    GROUP BY ano, mes
    ORDER BY ano, mes
""", nativeQuery = true)
    List<Object[]> consultarFaturamentoMensal();

    @Query(value = """
    SELECT
        f.id_fornecedor,
        f.nm_usuario_fornecedor,
        COUNT(a.id_avaliacao) AS total_avaliacoes,
        ROUND(AVG(a.qt_nota), 2) AS media_nota
    FROM
        tbavaliacao a
    JOIN
        tbfornecedor f ON f.id_fornecedor = a.id_fornecedor
    GROUP BY
        f.id_fornecedor, f.nm_usuario_fornecedor
    ORDER BY
        media_nota DESC
""", nativeQuery = true)
    List<Object[]> consultarRelatorioAvaliacoes();
}